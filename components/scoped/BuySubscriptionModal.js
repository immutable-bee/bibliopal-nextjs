import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import ButtonComponent from "@/components/utility/Button";
import CheckboxComponent from "@/components/utility/Checkbox";
import LoadingComponent from '@/components/utility/loading';
import ModalComponent from '@/components/utility/Modal';
const BuySubscriptionModal = ({ isOpen, onClose, loading, onSubmit, details }) => {
    const [useDefaultPayment, setUseDefaultPayment] = useState(true);
    const [userHasDefault, setUserHasDefault] = useState(false);
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState();
    const [addPaymentLoading, setAddPaymentLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const offer = details

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

    const handleAddPaymentMethod = async (props) => {
        setAddPaymentLoading(true);
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
        setAddPaymentLoading(false);
    };

    useEffect(() => {
        getDefaultPayment();
    }, []);

    return (
        <ModalComponent open={isOpen}
            onClose={onClose} title="Payment Method" >
            {useDefaultPayment && userHasDefault ? (
                <>
                    <div id="ROR-payment-method">
                        <div className="payment-method-info bg-gray-300 my-2 text-black font-medium text-base text-center border border-black py-1.5 rounded-full w-full">
                            <span>
                                {defaultPaymentMethod.card.brand.toUpperCase()} **** **** ****{" "}
                                {defaultPaymentMethod.card.last4} -{" "}
                                {defaultPaymentMethod.card.exp_month}/
                                {defaultPaymentMethod.card.exp_year}{" "}
                                {defaultPaymentMethod.default}
                            </span>
                        </div>
                    </div>
                    <CheckboxComponent
                        id="ROR-modal-use-default"
                        name="modal-use-default"

                        isSelected={useDefaultPayment}
                        onChange={(isSelected) => {
                            setUseDefaultPayment(isSelected);
                        }}
                        size={"xs"}
                    >
                        Use Default Payment Method?
                    </CheckboxComponent>
                </>
            ) : (
                <>
                    <CardElement id="ROR-make-listing-offer-cardelement" />
                    {addPaymentLoading ? (
                        <LoadingComponent />
                    ) : (
                        <div id="ROR-payment-modal-row" className="flex justify-center">
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
                    )}
                </>
            )}
            {loading ? (
                <LoadingComponent />
            ) : (
                <ButtonComponent
                    onClick={() => onSubmit(offer.id)}
                    id="ROR-payment-modal-submit-btn"
                    full rounded
                >
                    Submit
                </ButtonComponent>
            )}
        </ModalComponent>
    );
};

export default BuySubscriptionModal;