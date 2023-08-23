import { prisma } from "../../../../db/prismaDB";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_TEST_SK, {
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

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_TEST_WH_CHECKOUT_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log(event);
    const session = event.data.object;
    console.log(session);
    const sessionId = session.id;
    const customerId = session.client_reference_id;
    const isSubscription = event.data.object.subscription ? true : false;
    const stripeCustomerId = session.customer;

    let product;

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items.data.price.product"],
      });

      console.log(fullSession);

      product = fullSession.line_items[0].data.price.product;

      console.log(product);
    } catch (err) {
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
            },
          });
          const customer = await stripe.customers.update(stripeCustomerId, {
            metadata: { businessId: customerId },
          });
        }
      }

      if (product.metadata.userType === "consumer") {
        let amount = isSubscription
          ? parseInt(product.metadata.subAmount, 10)
          : parseInt(product.metadata.singleAmount, 10);

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
        }
      }
    } catch (err) {
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
