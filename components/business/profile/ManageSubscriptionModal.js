import ModalComponent from "../../utility/Modal";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import { Loading } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const ManageSubscriptionModal = ({
  user,
  visible,
  onClose,
  setNotifications,
  setNotificationType,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subView, setSubView] = useState(1);
  const [isResumingSubscription, setIsResumingSubscription] = useState(false);

  const [currentMembership, setCurrentMembership] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState({});

  const [loading, setLoading] = useState(false);

  const isStripeLive = true;

  const testPaymentLinks = [
    `https://buy.stripe.com/test_8wMaGC4H58LmcKI28q?client_reference_id=${
      businessId ? businessId : ""
    }`,
    `https://buy.stripe.com/test_9AQg0W4H5f9K4ec9AT?client_reference_id=${
      businessId ? businessId : ""
    }`,
    `https://buy.stripe.com/test_9AQ2a60qP4v69yweVe?client_reference_id=${
      businessId ? businessId : ""
    }`,
    `https://buy.stripe.com/test_7sI3ea4H50eQfWU6oJ?client_reference_id=${
      businessId ? businessId : ""
    }`,
  ];
  const livePaymentLinks = [
    `https://buy.stripe.com/8wMaHTbkw0p07aUbJ4?client_reference_id=${
      businessId ? businessId : ""
    }`,
    `https://buy.stripe.com/bIYaHT1JWc7I52MeVh?client_reference_id=${
      businessId ? businessId : ""
    }`,
    `https://buy.stripe.com/8wM2bn1JWb3E7aUdRe?client_reference_id=${
      businessId ? businessId : ""
    }`,
    `https://buy.stripe.com/9AQeY99co3Bc8eY3cB?client_reference_id=${
      businessId ? businessId : ""
    }`,
  ];
  const paymentLinks = isStripeLive ? livePaymentLinks : testPaymentLinks;

  useEffect(() => {
    if (user) {
      setCurrentMembership(user.business.membership);
      setBusinessId(user.business.id);
      if (user.business.membership !== "FREE") {
        setIsSubscribed(true);
        setSubscriptionId(user.business.subscriptionId);
        if (user.business.subscriptionId) {
          (async () => {
            await fetchSubscriptionData();
          })();
        }
      }
    }
  }, [user, subscriptionId]);

  const fetchSubscriptionData = async () => {
    const response = await fetch(`/api/stripe/business/${subscriptionId}`);
    const data = await response.json();

    if (response.ok) {
      setSubscriptionData(data);
    } else {
      console.error("Failed to fetch subscription data:", data.error);
    }
  };

  const resumeSubscription = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/business/resumeSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Subscription Resumed:", data);
      setLoading(false);
      setNotifications([1]);
      setNotificationType("resumed subscription");
      await fetchSubscriptionData();
      onClose();
    } catch (error) {
      console.error("Failed to resume subscription:", error.message);
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/business/cancelSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Subscription will be canceled at end of period:", data);
      setLoading(false);
      setNotifications([1]);
      setNotificationType("canceled subscription");
      await fetchSubscriptionData();
      onClose();
    } catch (error) {
      console.error("Failed to cancel subscription:", error.message);
      setLoading(false);
    }
  };

  const handleSubViewChange = (view) => {
    setSubView(view);
  };

  const MembershipUnknownView = () => {
    return (
      <div className="w-full h-full flex justify-center">
        <Loading size="lg" />
      </div>
    );
  };

  const NotSubscribedView = () => {
    return (
      <div className="flex flex-col items-center">
        {subView === 1 ? (
          <>
            <h6 className="text-lg font-semibold">
              Current Plan: {capitalizeFirstLetter(currentMembership)}
            </h6>
            <h6 className="font-medium">Plan Features</h6>
            <ul>
              <li>250 listings per month</li>
              <li>3 day inventory visibility</li>
            </ul>
            <div className="mt-5 flex justify-center ">
              <div className="flex flex-col">
                <h6 className="self-center text-lg font-semibold">
                  Basic Plan
                </h6>
                <h6 className="italic mb-2 text-center">
                  $5.99/Month | $49.99/Year
                </h6>
                <ul className="list-disc ml-5">
                  <li>1,000 listings per month</li>
                  <li>3-7 day inventory visibility</li>
                  <li>10% off upload credit purchases</li>
                </ul>
                <button
                  onClick={() => handleSubViewChange(2)}
                  className="mt-5 bg-sky-500 w-1/2 py-3 self-center rounded-lg text-white border border-black"
                >
                  Choose Plan
                </button>
              </div>
              <div className="flex flex-col">
                <h6 className="self-center text-lg font-semibold">
                  Premium Plan
                </h6>
                <h6 className="italic mb-2 text-center">
                  $11.99/Month | $99.99/Year
                </h6>
                <ul className="list-disc ml-5">
                  <li>5,000 listings per month</li>
                  <li>3-30 day inventory visibility</li>
                  <li>20% off upload credit purchases</li>
                </ul>
                <button
                  onClick={() => handleSubViewChange(3)}
                  className="mt-5 bg-sky-500 w-1/2 py-3 self-center rounded-lg text-white border border-black"
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </>
        ) : subView === 2 ? (
          <>
            <button
              onClick={() => handleSubViewChange(1)}
              className="px-1 py-1 bg-blbBlue rounded-full self-start"
            >
              <Image
                src="/images/icons/icon-chevron.svg"
                width={20}
                height={20}
                alt="return button icon"
              />
            </button>
            <h6 className="text-2xl font-semibold">Basic Plan</h6>
            <ul className="list-disc mt-5">
              <li className="">1,000 listings per month</li>
              <li>3-7 day inventory visibility</li>
              <li>10% off upload credit purchases</li>
            </ul>
            <div className="flex gap-20 mt-8 mb-10">
              <div>
                <h6 className="text-center mb-3 italic font-medium text-lg">
                  $5.99 Per Month
                </h6>
                <Link
                  className="px-8 py-3 text-white bg-blbBlue border border-black rounded-lg"
                  href={paymentLinks[0]}
                >
                  Monthly Plan
                </Link>
              </div>
              <div>
                <h6 className="text-center mb-3 italic font-medium text-lg">
                  $49.99 Per Year
                </h6>
                <Link
                  className="px-8 py-3 text-white bg-blbBlue border border-black rounded-lg"
                  href={paymentLinks[1]}
                >
                  Yearly Plan
                </Link>
              </div>
            </div>
          </>
        ) : subView === 3 ? (
          <>
            <button
              onClick={() => handleSubViewChange(1)}
              className="px-1 py-1 bg-blbBlue rounded-full self-start"
            >
              <Image
                src="/images/icons/icon-chevron.svg"
                width={20}
                height={20}
                alt="return button icon"
              />
            </button>
            <h6 className="text-lg font-semibold">Premium Plan</h6>
            <ul className="list-disc mt-5">
              <li>5,000 listings per month</li>
              <li>3-30 day inventory visibility</li>
              <li>20% off upload credit purchases</li>
            </ul>
            <div className="flex gap-20 mt-8 mb-10">
              <div>
                <h6 className="text-center mb-3 italic font-medium text-lg">
                  $11.99 Per Month
                </h6>
                <Link
                  className="px-8 py-3 text-white bg-blbBlue border border-black rounded-lg"
                  href={paymentLinks[2]}
                >
                  Monthly Plan
                </Link>
              </div>
              <div>
                <h6 className="text-center mb-3 italic font-medium text-lg">
                  $99.99 Per Year
                </h6>
                <Link
                  className="px-8 py-3 text-white bg-blbBlue border border-black rounded-lg"
                  href={paymentLinks[3]}
                >
                  Yearly Plan
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  };

  const SubscribedView = () => {
    return (
      <div className="flex flex-col items-center">
        <h6 className="text-2xl font-semibold">
          Current Plan: {capitalizeFirstLetter(currentMembership)}
        </h6>
        <h6 className="mt-5 mb-2 text-xl font-medium">Plan features</h6>
        {currentMembership === "BASIC" ? (
          <ul className="list-disc">
            <li>1,000 listings per month</li>
            <li>3-7 day inventory visibility</li>
            <li>10% off upload credit purchases</li>
          </ul>
        ) : (
          <ul className="list-disc">
            <li>5,000 listings per month</li>
            <li>3-30 day inventory visibility</li>
            <li>20% off upload credit purchases</li>
          </ul>
        )}
        {subView === 1 ? (
          <>
            <div className="mt-5 ">
              {subscriptionData?.cancelAt ? (
                <div>
                  <h6 className="text-center font-semibold">
                    Membership expires on: {subscriptionData?.cancelAt}{" "}
                  </h6>
                  <p className="text-center mt-2">
                    {isResumingSubscription
                      ? "Confirm membership renewal?"
                      : "If you would like to resume your membership before it expires, You can click the button below."}
                  </p>
                </div>
              ) : (
                <>
                  <h6 className="mb-2">
                    Next Due Date: {subscriptionData?.nextDueDate}
                  </h6>
                  <h6>Amount Due: ${subscriptionData?.amountDue}</h6>
                </>
              )}
            </div>
            {isResumingSubscription ? (
              <div className="flex gap-10">
                <button
                  disabled={loading}
                  onClick={resumeSubscription}
                  className="mt-5 bg-sky-500 px-8 py-3 self-center rounded-lg text-white border border-black"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsResumingSubscription(false)}
                  className="mt-5 bg-lime-600 px-8 py-3 self-center rounded-lg text-white border border-black"
                >
                  Go Back
                </button>
              </div>
            ) : (
              <button
                onClick={
                  subscriptionData?.cancelAt
                    ? () => setIsResumingSubscription(true)
                    : () => handleSubViewChange(2)
                }
                className="mt-5 bg-sky-500 w-1/2 py-3 self-center rounded-lg text-white border border-black"
              >
                {subscriptionData?.cancelAt
                  ? "Resume Membership"
                  : "Cancel Plan"}
              </button>
            )}
          </>
        ) : (
          <div>
            <h6 className="text-center text-lg font-semibold mt-3 mb-3">
              Are you sure you want to cancel your subscription?
            </h6>
            <p className="text-center">
              After canceling, you will retain your membership for the rest of
              the current billing cycle ending on: {subscriptionData?.cancelAt}
            </p>
            <div className="flex justify-evenly">
              <button
                disabled={loading}
                onClick={cancelSubscription}
                className="mt-5 bg-sky-500 w-1/3 py-3 self-center rounded-lg text-white border border-black"
              >
                Confirm
              </button>
              <button
                onClick={() => handleSubViewChange(1)}
                className="mt-5 bg-lime-600 w-1/3 py-3 self-center rounded-lg text-white border border-black"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ModalComponent
      open={visible}
      title="Manage Subscription"
      onClose={onClose}
    >
      {!currentMembership ? (
        <MembershipUnknownView />
      ) : isSubscribed ? (
        <SubscribedView />
      ) : (
        <NotSubscribedView />
      )}
    </ModalComponent>
  );
};

export default ManageSubscriptionModal;
