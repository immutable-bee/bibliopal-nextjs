import { prisma } from "../../../../db/prismaDB";
import Stripe from "stripe";

const isStripeLive = true;

const liveStripeKey = process.env.STRIPE_LIVE_SK;
const testStripeKey = process.env.STRIPE_TEST_SK;

const stripeKey = isStripeLive ? liveStripeKey : testStripeKey;

const liveWebhookSecret = process.env.STRIPE_LIVE_WH_INVOICE_SECRET;
const testWebhookSecret = process.env.STRIPE_TEST_WH_INVOICE_SECRET;

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
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;

    try {
      if (!invoice.subscription) {
        return res.status(200).json({ received: true });
      }
      const stripeCustomerId = invoice.customer;

      const customer = await stripe.customers.retrieve(stripeCustomerId);

      if (customer.metadata.businessId) {
        return res.status(200).json({ received: true });
      }

      const lineItem = invoice.lines.data[0];
      const priceId = lineItem.price.id;

      let metadata;

      try {
        const price = await stripe.prices.retrieve(priceId);
        metadata = price.metadata;
      } catch (err) {
        console.error("Error retrieving product metadata: ", err);
      }

      const amount = parseInt(metadata.creditAmount, 10);

      await prisma.consumer.update({
        where: {
          id: customer.metadata.businessId,
        },
        data: {
          paid_alerts: {
            increment: amount,
          },
        },
      });
    } catch (error) {
      console.error(
        `Error processing invoice.payment_succeeded: ${error.message}`
      );
      return res.status(500).send(`Webhook Error: ${error.message}`);
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
