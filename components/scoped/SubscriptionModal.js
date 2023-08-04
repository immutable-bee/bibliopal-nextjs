import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ButtonComponent from "../utility/Button";
import CheckboxComponent from "../utility/Checkbox";
import LoadingComponent from '../utility/loading';
import ModalComponent from '../utility/Modal';
const SubscriptionModal = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const [useDefaultPayment, setUseDefaultPayment] = useState(true);
  const [userHasDefault, setUserHasDefault] = useState(false);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState();
  const [nationalPlan, setNationalPlan] = useState(false);
  const [yearlyPlan, setYearlyPlan] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [subMessage, setSubMessage] = useState("");

  const getDefaultPayment = async () => {
    try {
      const response = await fetch("/api/stripe/get-default-payment");

      if (response.status === 200) {
        const defaultMethod = await response.json();
        setUserHasDefault(true);
        setDefaultPaymentMethod(defaultMethod);
      } else if (response.status === 404) {
        setUserHasDefault(false);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      setUserHasDefault(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      return;
    }

    try {
      const response = await fetch("/api/stripe/add-payment-method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          setAsDefault: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the payment method");
      }
      getDefaultPayment();
      setUseDefaultPayment(true);
      // Refresh the payment methods list after adding the new one
      // Implement a function to fetch the updated list of payment methods
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscriptionType = () => {
    const planType = nationalPlan ? "national" : "state";
    const duration = yearlyPlan ? "yearly" : "monthly";
    return `${planType}_${duration}`;
  };

  const handleSubscription = async (event) => {
    event.preventDefault();
    setSubLoading(true);

    if (!stripe || !elements) {
      return;
    }
    // Handle server-side subscription creation
    const response = await fetch("/api/stripe/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionType: handleSubscriptionType(),
      }),
    });

    if (response.ok) {
      setSubLoading(false);
      setSubMessage("Subscribed!");
      setTimeout(() => {
        props.closeSubscriptionModal();
        setSubMessage(null);
        router.reload();
      }, 2500);
    } else {
      setSubLoading(false);
      setSubMessage("Failed to create subscription");
      console.error("Failed to create subscription");
      setTimeout(() => {
        props.closeSubscriptionModal();
        setSubMessage(null);
      }, 2500);
    }
  };

  useEffect(() => {
    getDefaultPayment();
  }, []);

  const planHighlight = () => {
    return nationalPlan ? "state" : "national";
  };
  const durationHighlight = () => {
    return yearlyPlan ? "monthly" : "yearly";
  };

  const priceHandler = () => {
    return nationalPlan
      ? yearlyPlan
        ? "$11.99"
        : "$99.99"
      : yearlyPlan
        ? "$49.99"
        : "$5.99";
  };

  const detailHandler = () => {
    let details = {};
    !nationalPlan
      ? (details = [
        "List up to 1000 per month",
        "3-7 day inventory visibility",
      ])
      : (details = [
        "List up to 5000 per month",
        "3-30 day inventory visibility",
      ]);
    return details;
  };

  return (
    <ModalComponent open={props.isSubscriptionModalOpen} title="Subscribe" width="500px" onClose={props.closeSubscriptionModal}>
      <form id="stripe-subscription-form" onSubmit={handleSubscription}>
        <div id="subscription-options-details" className="flex">
          <div id="sliders-container" className=" w-32 flex-shrink-0">

            <label id="sliders-plan"
              className="relative mx-2 my-2 inline-flex items-center cursor-pointer">
              <input
                className="react-switch-checkbox sr-only peer"
                id={`react-switch-plan`}
                type="checkbox"
                checked={nationalPlan}
                onChange={() => setNationalPlan(!nationalPlan)}
              />
              <div class="w-11 relative h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <div className="slider-options ml-3">
                <h6
                  id="slider-state"
                  style={{
                    color: planHighlight() == "state" ? "silver" : "black",
                  }}
                >
                  State
                </h6>
                <h6
                  id="slider-national"
                  style={{
                    color: planHighlight() == "national" ? "silver" : "black",
                  }}
                >
                  National
                </h6>
              </div>
            </label>
            <label id="sliders-duration" className="relative my-2 mx-2 inline-flex items-center cursor-pointer">
              <input
                className="react-switch-checkbox sr-only peer"
                id={`react-switch-duration`}
                type="checkbox"
                checked={yearlyPlan}
                onChange={() => setYearlyPlan(!yearlyPlan)}
              />
              <div class="w-11 relative h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <div className="slider-options ml-3">
                <h6
                  id="slider-monthly"
                  className="text-sm font-semibold text-black"
                  style={{
                    color:
                      durationHighlight() == "monthly" ? "silver" : "black",
                  }}
                >
                  Monthly
                </h6>
                <h6
                  id="slider-yearly"
                  className="text-sm font-semibold text-gray-600"
                  style={{
                    color:
                      durationHighlight() == "yearly" ? "silver" : "black",
                  }}
                >
                  Yearly
                </h6>
              </div>
            </label>
          </div>
          <div id="subscription-details" className="mb-8">
            <ul id="plan-details" className="text-sm text-black list-disc !mt-2 ml-4">
              Plan Features:
              {detailHandler() && detailHandler().map((item, index) => (
                <li key={index} className="text-sm text-gray-600 font-normal ml-4">{item}</li>
              ))}
            </ul>

            <h5 id="subscription-details-title" className="text-lg mt-14 font-semibold">
              Due Today: {priceHandler()}
            </h5>
          </div>
        </div>

        {userHasDefault && useDefaultPayment ? (
          <>
            <div id="subscribe-payment-method">
              <div id="subscribe-payment-method-info">
                <span>
                  {defaultPaymentMethod.card.brand.toUpperCase()} **** ****
                  **** {defaultPaymentMethod.card.last4} -{" "}
                  {defaultPaymentMethod.card.exp_month}/
                  {defaultPaymentMethod.card.exp_year}{" "}
                  {defaultPaymentMethod.default}
                </span>
              </div>
            </div>
            <CheckboxComponent
              id="subscribe-use-default"
              name="use-default"
              isSelected={useDefaultPayment}
              onChange={(isSelected) => {
                setUseDefaultPayment(isSelected);
              }}

            >
              Use Default Payment Method?
            </CheckboxComponent>
          </>
        ) : (
          <div id="subscribe-new-payment-method-container">
            <CardElement id="subscribe-cardelement" />
            <div id="ROR-payment-modal-row" className="flex mt-4 mb-2 justify-center">
              <ButtonComponent
                color="blue"
                className="px-6 mx-2"
                rounded
                id="ROR-modal-save-payment-method"
                onClick={handleAddPaymentMethod}
                auto
              >
                Save
              </ButtonComponent>
              <ButtonComponent
                rounded
                className="px-6 mx-2"
                type="secondary"
                onClick={() => {
                  setUseDefaultPayment(true);
                }}
                id="ROR-modal-cancel-new-payment-method"
                auto
              >
                Cancel
              </ButtonComponent>
            </div>
          </div>
        )}
        {!subLoading && !subMessage ? (
          <ButtonComponent id="submit-stripe-btn" full rounded type="submit" disabled={!stripe}>
            Pay and Subscribe
          </ButtonComponent>
        ) : subLoading && !subMessage ? (
          <LoadingComponent />
        ) : (
          <h6 id="subscribe-message">{subMessage}</h6>
        )}
      </form>
    </ModalComponent>

  );
};

export default SubscriptionModal;
