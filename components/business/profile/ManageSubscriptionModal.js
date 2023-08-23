import ModalComponent from "../../utility/Modal";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import ButtonComponent from "../../utility/Button";
import { Loading, Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const ManageSubscriptionModal = ({ user, visible, onClose }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [cancelPlanView, setCancelPlanView] = useState(false);
  const [subView, setSubView] = useState(1);

  const [currentMembership, setCurrentMembership] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentMembership(user.business.membership);
      if (user.business.membership !== "FREE") {
        setIsSubscribed(true);
      }
    }
  }, [user]);

  const cancelPlanViewHandler = () => {
    setCancelPlanView(true);
  };

  const MembershipUnknownView = () => {
    return (
      <div className="w-full h-full flex justify-center">
        <Loading size="lg" />
      </div>
    );
  };

  const handleNotSubscribedSubView = (view) => {
    setSubView(view);
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
                  onClick={() => handleNotSubscribedSubView(2)}
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
                  onClick={() => handleNotSubscribedSubView(3)}
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
              onClick={() => handleNotSubscribedSubView(1)}
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
                  href="https://buy.stripe.com/test_8wMaGC4H58LmcKI28q"
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
                  href="https://buy.stripe.com/test_9AQg0W4H5f9K4ec9AT"
                >
                  Yearly Plan
                </Link>
              </div>
            </div>
          </>
        ) : subView === 3 ? (
          <>
            <button
              onClick={() => handleNotSubscribedSubView(1)}
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
                  href="https://buy.stripe.com/test_9AQ2a60qP4v69yweVe"
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
                  href="https://buy.stripe.com/test_7sI3ea4H50eQfWU6oJ"
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
      <div>
        <h6>Current Plan: {capitalizeFirstLetter(currentMembership)}</h6>
        <h6>Plan features</h6>
        {currentMembership === "BASIC" ? (
          <ul>
            <li>1,000 listings per month</li>
            <li>3-7 day inventory visibility</li>
            <li>10% off upload credit purchases</li>
          </ul>
        ) : (
          <ul>
            <li>5,000 listings per month</li>
            <li>3-30 day inventory visibility</li>
            <li>20% off upload credit purchases</li>
          </ul>
        )}

        <ButtonComponent>Cancel Plan</ButtonComponent>
      </div>
    );
  };

  const CancelPlanView = () => {};

  return (
    <ModalComponent
      open={visible}
      title="Manage Subscription"
      onClose={onClose}
    >
      {!currentMembership ? (
        <MembershipUnknownView />
      ) : cancelPlanView ? (
        <CancelPlanView />
      ) : isSubscribed ? (
        <SubscribedView />
      ) : (
        <NotSubscribedView />
      )}
    </ModalComponent>
  );
};

export default ManageSubscriptionModal;
