import Stripe from "stripe";
import * as notify from "../notifier/notify";

const isStripeLive = true;

const liveStripeKey = process.env.STRIPE_LIVE_SK;
const testStripeKey = process.env.STRIPE_TEST_SK;

const stripeKey = isStripeLive ? liveStripeKey : testStripeKey;

const stripe = new Stripe(stripeKey, {
  apiVersion: "2022-11-15",
});

const handler = async (req, res) => {
  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    res.status(400).json({ error: "Subscription ID is required" });
    return;
  }

  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    res.status(200).json(subscription);
  } catch (error) {
    notify.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
