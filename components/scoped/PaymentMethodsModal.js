import { useState, useEffect } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import ButtonComponent from "../utility/Button";
import ModalComponent from '../utility/Modal';

const PaymentMethodsModal = ({ isOpen, onClose }) => {
  const [addingPaymentMethod, setAddingPaymentMethod] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("/api/stripe/get-payment-methods");
      if (!response.ok) {
        throw new Error("An error occurred while fetching payment methods.");
      }
      const data = await response.json();
      setPaymentMethods(data);
    } catch (err) {
      setError(err.message);
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
          // setAsDefault: true or false, depending on your requirement
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the payment method");
      }
      fetchPaymentMethods();

      // Refresh the payment methods list after adding the new one
      // Implement a function to fetch the updated list of payment methods
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemovePaymentMethod = async (id) => {
    try {
      const response = await fetch(
        `/api/stripe/delete-payment-method?paymentMethodId=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove the payment method");
      }
      fetchPaymentMethods();
      // Refresh the payment methods list after removing the payment method
      // Implement a function to fetch the updated list of payment methods
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetDefaultPaymentMethod = async (id) => {
    try {
      const response = await fetch("/api/stripe/set-default-payment-method", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to set the default payment method");
      }
      fetchPaymentMethods();
      // You may want to update the UI to indicate the new default payment method
      // or refetch the payment methods to get the updated data
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show a notification or an error message
    }
  };

  return (
    <ModalComponent open={isOpen} title="Manage Payment Methods" width={"600px"} onClose={onClose}>
      <>
        <div className="payment-methods-grid">
          {paymentMethods &&
            paymentMethods.map((method) => (
              <div key={method.id} className="payment-method bg-gray-100 my-2 py-2 rounded-lg w-full">
                <div className="payment-method-info w-full text-center">
                  <span className="text-center">
                    {method.card.brand.toUpperCase()} **** **** ****{" "}
                    {method.card.last4} - {method.card.exp_month}/
                    {method.card.exp_year} {method.default && "(Default)"}
                  </span>
                </div>
                <div className="payment-method-actions mt-3 flex justify-center">
                  <ButtonComponent

                    color="blue"
                    className="!py-0.5 !mx-1 text-sm" rounded

                    onClick={() => handleSetDefaultPaymentMethod(method.id)}
                  >
                    Set as Default
                  </ButtonComponent>
                  <ButtonComponent

                    color="red"
                    className="!py-0.5 !mx-1 text-sm" rounded
                    type="error"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                  >
                    Remove
                  </ButtonComponent>
                </div>
              </div>
            ))}
          <div className="add-payment-method">
            {!addingPaymentMethod && (
              <ButtonComponent
                color="blue"
                className="!w-64 mx-auto mt-4"
                rounded full
                id="add-payment-method-button"

                onClick={() => setAddingPaymentMethod(true)}
              >
                Add a new payment method
              </ButtonComponent>
            )}
            {addingPaymentMethod && (
              <>
                <CardElement className="mt-6 mb-3" id="payment-method-input" />
                <div className="flex justify-center">
                  <ButtonComponent
                    color="blue"
                    className="px-6 mx-2"
                    rounded
                    id="save-payment-method"

                    onClick={handleAddPaymentMethod}
                  >
                    Save
                  </ButtonComponent>
                  <ButtonComponent
                    rounded
                    className="px-6 mx-2"
                    type="secondary"

                    onClick={() => setAddingPaymentMethod(false)}
                    id="cancel-new-payment-method"
                  >
                    Cancel
                  </ButtonComponent>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </ModalComponent>

  );
};

export default PaymentMethodsModal;
