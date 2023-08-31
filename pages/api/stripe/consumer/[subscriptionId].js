import Stripe from "stripe";

const isStripeLive = true;

const liveStripeKey = process.env.STRIPE_LIVE_SK;
const testStripeKey = process.env.STRIPE_TEST_SK;

const stripeKey = isStripeLive ? liveStripeKey : testStripeKey;

const stripe = new Stripe(stripeKey, {
  apiVersion: "2022-11-15",
});

const padZero = (number) => {
  return number < 10 ? "0" + number : number.toString();
};

const formatTimestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.getMonth() + 1}/${padZero(
    date.getDate()
  )}/${date.getFullYear()}`;
};

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subscriptionId } = req.query;

  if (!subscriptionId) {
    return res.status(400).json({ error: "Subscription ID is required" });
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const responseData = {
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      cancelAt: subscription.cancel_at
        ? formatTimestampToDate(subscription.cancel_at)
        : null,
      amountDue: (subscription.items.data[0].price.unit_amount / 100).toFixed(
        2
      ),
      nextDueDate: formatTimestampToDate(subscription.current_period_end),
      creditAmount: subscription.items.data[0].price.metadata.creditAmount,
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching subscription:", error);

    if (error.type === "StripeInvalidRequestError") {
      return res.status(400).json({ error: "Error: Invalid subscription ID" });
    }

    return res.status(500).json({ error: "Failed to fetch subscription data" });
  }
};

export default handler;
