import { prisma } from "../../../../db/prismaDB";
import Stripe from "stripe";
import * as notify from "../../notifier/notify";

const isStripeLive = true;

const liveStripeKey = process.env.STRIPE_LIVE_SK;
const testStripeKey = process.env.STRIPE_TEST_SK;

const stripeKey = isStripeLive ? liveStripeKey : testStripeKey;

const liveWebhookSecret = process.env.STRIPE_LIVE_WH_CHECKOUT_SECRET;
const testWebhookSecret = process.env.STRIPE_TEST_WH_CHECKOUT_SECRET;

const webhookSecret = isStripeLive ? liveWebhookSecret : testWebhookSecret;

const stripe = new Stripe(stripeKey, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const getRawBody = async (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
};

const handleStripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    const rawBody = await getRawBody(req);
    console.log("Retrieved raw body from request");

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    notify.error(err, `Webhook signature verification failed: ${err.message}`);
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const sessionId = session.id;
    const customerId = session.client_reference_id;
    const isSubscription = session.subscription ? true : false;
    const stripeCustomerId = session.customer;

    let product;
    let price;

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items.data.price.product"],
      });

      console.log(fullSession.line_items);

      product = fullSession.line_items.data[0].price.product;
      price = fullSession.line_items.data[0].price;

      console.log("Retrieved product:", product);
    } catch (err) {
      console.error("Error retrieving product:", err);

      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (product.metadata.userType === "business") {
        if (product.metadata.type === "credits") {
          const amount = parseInt(product.metadata.amount, 10);
          const addCredits = await prisma.business.update({
            where: {
              id: customerId,
            },
            data: {
              upload_credits: {
                increment: amount,
              },
            },
          });
        } else if (product.metadata.type === "subscription") {
          const updateMembership = await prisma.business.update({
            where: {
              id: customerId,
            },
            data: {
              membership: product.metadata.membership,
              subscriptionId: session.subscription,
            },
          });
          const customer = await stripe.customers.update(stripeCustomerId, {
            metadata: { businessId: customerId },
          });
        }
      }

      if (product.metadata.userType === "consumer") {
        let amount = parseInt(price.metadata.creditAmount);

        const addCredits = await prisma.consumer.update({
          where: {
            id: customerId,
          },
          data: {
            paid_alerts: {
              increment: amount,
            },
          },
        });

        if (isSubscription) {
          const customer = await stripe.customers.update(stripeCustomerId, {
            metadata: { consumerId: customerId },
          });

          const updateConsumer = await prisma.consumer.update({
            where: { id: customerId },
            data: {
              subscriptionId: session.subscription,
            },
          });
        }
      }
    } catch (err) {
      notify.error(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  res.status(200).json({ received: true });
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    await handleStripeWebhook(req, res);
  } else {
    console.log(`Received a ${req.method} request, but only POST is allowed`);
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
