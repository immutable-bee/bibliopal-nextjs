import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_TEST_SK, {
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
    res.status(500).json({ error: error.message });
  }
};

export default handler;
