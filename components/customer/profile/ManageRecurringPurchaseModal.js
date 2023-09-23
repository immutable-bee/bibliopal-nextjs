import { Modal } from "@nextui-org/react";
import { useState } from "react";
import * as notify from "../../../pages/api/notifier/notify";

const ManageRecurringPurchaseModal = ({
  visible,
  onClose,
  subscriptionData,
  setNotifications,
  setNotificationType,
  refreshUserData,
}) => {
  const [isConfirmView, setIsConfirmView] = useState(false);
  const [isCancelled, setIsCancelled] = useState(
    subscriptionData.cancelAtPeriodEnd
  );

  const [loading, setLoading] = useState(false);

  const resumeSubscription = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/resumeSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionData.subscriptionId),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Subscription Resumed:", data);
      setLoading(false);
      setNotifications([1]);
      setNotificationType("resumed subscription");
      await refreshUserData();
      onClose();
    } catch (error) {
      notify.error(error);
      console.error("Failed to resume subscription:", error.message);
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/cancelSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionData.subscriptionId),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Subscription will be canceled at end of period:", data);
      setLoading(false);
      setNotifications([1]);
      setNotificationType("canceled subscription");
      await refreshUserData();
      onClose();
    } catch (error) {
      notify.error(error);
      console.error("Failed to cancel subscription:", error.message);
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} closeButton onClose={onClose}>
      <Modal.Header className="border-b border-black">
        <h6 className="text-xl font-bold">Manage Recurring Purchase</h6>
      </Modal.Header>
      <Modal.Body>
        {isConfirmView ? (
          <div className="flex flex-col">
            <h6 className="text-center">
              {isCancelled
                ? "Are you sure you want to resume your recurring purchase?"
                : "Are you sure you want to cancel your recurring purchase?"}
            </h6>
            <div className="flex flex-col">
              <h6 className="pt-5 ">
                Next Due Date: {subscriptionData.nextDueDate}
              </h6>
              <h6 className="">Price: ${subscriptionData.amountDue}</h6>
            </div>
          </div>
        ) : (
          <div>
            {isCancelled ? (
              <div className="flex flex-col">
                <h6 className="text-xl pb-5 self-center">
                  Alert Bundle: {subscriptionData.creditAmount}
                </h6>
                <h6>Price: ${subscriptionData.amountDue}</h6>
                <h6>Ends on: {subscriptionData.cancelAt}</h6>
              </div>
            ) : (
              <div className="flex flex-col">
                <h6 className="text-xl pb-5 self-center">
                  Alert Bundle: {subscriptionData.creditAmount}
                </h6>
                <h6>Next Due Date: {subscriptionData.nextDueDate}</h6>
                <h6>Amount Due: ${subscriptionData.amountDue}</h6>
              </div>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isConfirmView ? (
          <div className="flex justify-center w-full gap-5">
            <button
              disabled={loading}
              onClick={isCancelled ? resumeSubscription : cancelSubscription}
              className="px-8 py-3 bg-blbBlue text-white border border-black rounded-lg"
            >
              Confirm
            </button>
            <button
              className="px-8 py-3 bg-green-600 text-white border border-black rounded-lg"
              onClick={() => setIsConfirmView(false)}
            >
              Go Back
            </button>
          </div>
        ) : isCancelled ? (
          <div className="flex justify-center w-full">
            <button
              className=" px-8 py-3 bg-blbBlue text-white border border-black rounded-lg"
              onClick={() => setIsConfirmView(true)}
            >
              Resume
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <button
              className="px-8 py-3 bg-blbBlue text-white border border-black rounded-lg"
              onClick={() => setIsConfirmView(true)}
            >
              Cancel
            </button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ManageRecurringPurchaseModal;
