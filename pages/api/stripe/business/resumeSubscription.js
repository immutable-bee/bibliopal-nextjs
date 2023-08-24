import Stripe from "stripe";

const isStripeLive = true;

const liveStripeKey = process.env.STRIPE_LIVE_SK;
const testStripeKey = process.env.STRIPE_TEST_SK;

const stripeKey = isStripeLive ? liveStripeKey : testStripeKey;

const stripe = new Stripe(stripeKey, {
  apiVersion: "2022-11-15",
});

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    return res.status(400).json({ error: "Subscription ID is required" });
  }

  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    // Check if the subscription was successfully updated
    if (subscription && !subscription.cancel_at_period_end) {
      return res
        .status(200)
        .json({ status: "Subscription resumed successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to resume the subscription" });
    }
  } catch (error) {
    console.error("Error resuming subscription:", error);
    return res.status(500).json({ error: "Failed to resume the subscription" });
  }
};

export default handler;
