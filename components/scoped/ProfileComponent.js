import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import ManageSubscriptionModal from "@/components/scoped/ManageSubscriptionModal";
import SubscriptionModal from "@/components/scoped/SubscriptionModal";
import UnsubscribeModal from "@/components/scoped/UnsubscribeModal";
import PaymentMethodsModal from "@/components/scoped/PaymentMethodsModal";
import { CircularInput, CircularTrack, CircularProgress, CircularThumb } from 'react-circular-input';
import PricingComponent from '@/components/scoped/PricingCustomer';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import ButtonComponent from "@/components/utility/Button";
const ProfileComponent = ({ }) => {



    //   

    const router = useRouter();
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const [isManageSubscriptionModalOpen, setIsManageSubscriptionModalOpen] =
        useState(false);

    const [subscriptionData, setSubscriptionData] = useState([
        {
            "id": "sub_1NPISoFQRfoKonSLuwXU5Qos",
            "object": "subscription",
            "application": null,
            "application_fee_percent": null,
            "automatic_tax": {
                "enabled": false
            },
            "billing_cycle_anchor": 1688274286,
            "billing_thresholds": null,
            "cancel_at": 1690952686,
            "cancel_at_period_end": true,
            "canceled_at": 1688315034,
            "cancellation_details": {
                "comment": null,
                "feedback": null,
                "reason": "cancellation_requested"
            },
            "collection_method": "charge_automatically",
            "created": 1688274286,
            "currency": "usd",
            "current_period_end": 1690952686,
            "current_period_start": 1688274286,
            "customer": "cus_O8ffnhdzShlrJj",
            "days_until_due": null,
            "default_payment_method": null,
            "default_source": null,
            "default_tax_rates": [],
            "description": null,
            "discount": null,
            "ended_at": null,
            "items": {
                "object": "list",
                "data": [
                    {
                        "id": "si_OBfogdvkE8eiYf",
                        "object": "subscription_item",
                        "billing_thresholds": null,
                        "created": 1688274286,
                        "metadata": {},
                        "plan": {
                            "id": "price_1MyfBJFQRfoKonSLN9RmBjvO",
                            "object": "plan",
                            "active": true,
                            "aggregate_usage": null,
                            "amount": 1500,
                            "amount_decimal": "1500",
                            "billing_scheme": "per_unit",
                            "created": 1681926757,
                            "currency": "usd",
                            "interval": "month",
                            "interval_count": 1,
                            "livemode": false,
                            "metadata": {},
                            "nickname": "Monthly Plan (State)",
                            "product": "prod_Nk9UlarsFUiKG6",
                            "tiers_mode": null,
                            "transform_usage": null,
                            "trial_period_days": null,
                            "usage_type": "licensed"
                        },
                        "price": {
                            "id": "price_1MyfBJFQRfoKonSLN9RmBjvO",
                            "object": "price",
                            "active": true,
                            "billing_scheme": "per_unit",
                            "created": 1681926757,
                            "currency": "usd",
                            "custom_unit_amount": null,
                            "livemode": false,
                            "lookup_key": null,
                            "metadata": {},
                            "nickname": "Monthly Plan (State)",
                            "product": "prod_Nk9UlarsFUiKG6",
                            "recurring": {
                                "aggregate_usage": null,
                                "interval": "month",
                                "interval_count": 1,
                                "trial_period_days": null,
                                "usage_type": "licensed"
                            },
                            "tax_behavior": "unspecified",
                            "tiers_mode": null,
                            "transform_quantity": null,
                            "type": "recurring",
                            "unit_amount": 1500,
                            "unit_amount_decimal": "1500"
                        },
                        "quantity": 1,
                        "subscription": "sub_1NPISoFQRfoKonSLuwXU5Qos",
                        "tax_rates": []
                    }
                ],
                "has_more": false,
                "total_count": 1,
                "url": "/v1/subscription_items?subscription=sub_1NPISoFQRfoKonSLuwXU5Qos"
            },
            "latest_invoice": "in_1NPISoFQRfoKonSL7dT9O4wI",
            "livemode": false,
            "metadata": {},
            "next_pending_invoice_item_invoice": null,
            "on_behalf_of": null,
            "pause_collection": null,
            "payment_settings": {
                "payment_method_options": null,
                "payment_method_types": null,
                "save_default_payment_method": "off"
            },
            "pending_invoice_item_interval": null,
            "pending_setup_intent": null,
            "pending_update": null,
            "plan": {
                "id": "price_1MyfBJFQRfoKonSLN9RmBjvO",
                "object": "plan",
                "active": true,
                "aggregate_usage": null,
                "amount": 1500,
                "amount_decimal": "1500",
                "billing_scheme": "per_unit",
                "created": 1681926757,
                "currency": "usd",
                "interval": "month",
                "interval_count": 1,
                "livemode": false,
                "metadata": {},
                "nickname": "Monthly Plan (State)",
                "product": "prod_Nk9UlarsFUiKG6",
                "tiers_mode": null,
                "transform_usage": null,
                "trial_period_days": null,
                "usage_type": "licensed"
            },
            "quantity": 1,
            "schedule": null,
            "start_date": 1688274286,
            "status": "active",
            "test_clock": null,
            "transfer_data": null,
            "trial_end": null,
            "trial_settings": {
                "end_behavior": {
                    "missing_payment_method": "create_invoice"
                }
            },
            "trial_start": null
        }
    ]);
    const [subscriptionStatus, setSubscriptionStatus] =
        useState("Monthly Plan (State)");
    // useState("Not Subscribed");
    const [storeName, setStoreName] = useState("");
    const [storeType, setStoreType] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [physicalAddressSale, setPhysicalAddressSale] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hoursSale, setHoursSale] = useState("");
    const [url, setUrl] = useState("");
    const [autoUpload, setAutoUpload] = useState(false);
    const [displayContactInfo, setDisplayContactInfo] = useState(false);
    const [visibility, setVisibility] = useState(0);
    const computedVisibility = () => Math.round(stepValue(visibility) * 10)
    const [planOptions, setPlanOptions] = useState("Free");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const JSON = {
            storeName,
            storeType,
            email,
            address,
            url,
            autoUpload,
            displayContactInfo,
            visibility,
            planOptions,
        }

        console.log(JSON)

        e.preventDefault();
        setLoading(true);

        try {
            await fetch("/api/onboarding", {
                method: "POST",
                body: JSON.stringify([senderEmail, JSON]),
            });
            setLoading(false);
            setSuccessMessage("Onboarding form submitted");
            setErrorMessage("");
        } catch (error) {
            setLoading(false);
            setErrorMessage("An error occurred while sending your data");
            setSuccessMessage("");
        }
    };

    const page = () => {
        // Define the routes to check
        const routes = ["/library", "/bookstore", "/thrift"];

        // Check if the current path includes any of the routes
        if (router.pathname.includes("/library")) {
            return "library";
        } else if (router.pathname.includes("/bookstore")) {
            return "bookstore";
        } else if (router.pathname.includes("/thrift")) {
            return "thrift";
        }

        // Return an empty string if none of the routes match
        return "";
    };

    const manageSubscriptionModalHandler = () => {
        setIsManageSubscriptionModalOpen(!isManageSubscriptionModalOpen);
    };

    const handleSubscriptionModal = () => {
        // subscriptionStatus === "Not Subscribed"
        //     ? 
        setIsSubscriptionModalOpen(!isSubscriptionModalOpen)
        // : 
        // setIsManageSubscriptionModalOpen(!isManageSubscriptionModalOpen);
    };


    const handleUnsubscribe = async () => {
        try {
            setSubLoading(true);
            const response = await fetch("/api/stripe/cancel-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: session.user.email }),
            });

            if (response.ok) {
                const data = await response.json();
                setCancelMessage(data.message);
            } else {
                const errorData = await response.json();
                setCancelMessage(
                    errorData.message ||
                    "An error occurred while canceling the subscription"
                );
            }
        } catch (error) {
            console.error("Error:", error);
            setCancelMessage("An error occurred while canceling the subscription");
        } finally {
            setTimeout(() => {
                setSubLoading(false);
                setCancelMessage(null);
                closeUnsubModal();
                router.reload();
            }, 2500);
        }
    };
    const stepValue = v => Math.round(v * 10) / 10

    const closeManageSubscriptionModalHandler = () => {
        console.log('close')
        setIsManageSubscriptionModalOpen(false);
    };



    // 
    // 
    // const { data: session } = useSession({ required: true });
    const stripe = useStripe();
    const elements = useElements();
    const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false);
    const [isPaymentMethodsModalOpen, setIsPaymentMethodsModalOpen] =
        useState(false);

    const [senderEmail, setSenderEmail] = useState();
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [connectAccountStatus, setConnectAccountStatus] = useState("");
    const [userData, setUserData] = useState({
        business_name: "",
        business_street: "",
        business_city: "",
        business_state: "",
        business_zip: "",
        business_phone: "",
        business_email: "",
        business_website: "",
        shipping_city: "",
        shipping_state: "",
        shipping_zip: "",
        shipping_street: "",
        role: "",
        _count: { requests: "", inventory: "" },
    });

    const [subLoading, setSubLoading] = useState(false);
    const [subMessage, setSubMessage] = useState("");
    const [cancelMessage, setCancelMessage] = useState("");

    const [subscriptionSectionLoading, setSubscriptionSectionLoading] =
        useState(false);
    const [accountSectionLoading, setAccountSectionLoading] = useState(false);
    const [connectSectionLoading, setConnectSectionLoading] = useState(false);

    // Email Preferences Modal
    const [emailPreferencesOpen, setEmailPreferencesOpen] = useState(false);

    const emailModalCloseHandler = () => {
        setEmailPreferencesOpen(false);
    };

    //

    const closeSubscriptionModal = () => {
        setIsSubscriptionModalOpen(!isSubscriptionModalOpen);
    };


    const openPaymentMethodsModal = () => {
        setIsPaymentMethodsModalOpen(true);
    };

    const closePaymentMethodsModal = () => {
        setIsPaymentMethodsModalOpen(false);
    };



    const closeUnsubModal = () => {
        setIsUnsubscribeModalOpen(false);
    };


    const handleChange = async (e) => {
        console.log(e)
        const { name, value } = e.target;
        console.log(name, value)
        if (name === "business_state") {
            setFormData({ ...formData, [name]: value.toUpperCase() });
        } else {
            // Handle other inputs
            setFormData({ ...formData, [name]: value });
        }
        console.log(formData)

        e.preventDefault();
        setLoading(true);

        try {
            await fetch("/api/onboarding", {
                method: "POST",
                body: JSON.stringify([senderEmail, formData]),
            });
            setLoading(false);
            setSuccessMessage("Onboarding form submitted");
            setErrorMessage("");
        } catch (error) {
            setLoading(false);
            setErrorMessage("An error occurred while sending your data");
            setSuccessMessage("");
        }
    };




    const fetchConnectAccountStatus = async () => {
        if (userData.stripe_connect_id) {
            try {
                const response = await fetch("/api/stripe/connect-account-status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ accountId: userData.stripe_connect_id }),
                });

                if (response.ok) {
                    const { status } = await response.json();
                    setConnectAccountStatus(status);
                } else {
                    console.error("Failed to fetch connect account status");
                }
            } catch (error) {
                console.error("Error fetching connect account status: ", error);
            }
        }
        setConnectSectionLoading(false);
    };

    useEffect(() => {
        fetchConnectAccountStatus();
    }, [userData]);

    useEffect(() => {
        if (router.query.emailPreferencesOpen === "true") {
            setEmailPreferencesOpen(true);
        }
    }, [router]);


    return (
        <div className="min-h-screen bg-[#FEFBE8]">
            <Header />
            <div className="h-full flex flex-col items-center justify-center">
                <div className="max-w-xl w-full bg-whit px-4 sm:px-8 py-3 sm:py-6 rounded">
                    <h1 className="text-lg sm:text-2xl font-medium text-center ">
                        Profile Page
                    </h1>
                    <form onSubmit={handleSubmit} className="mt-2 sm:mt-6">
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Store name</label>
                            <input
                                type="text"
                                className="bg-white form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Store Type</label>
                            <select
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-select border border-gray-500 w-full rounded-lg  px-3 my-1 py-2"
                                value={storeType}
                                onChange={(e) => setStoreType(e.target.value)}
                            >
                                <option value="Thrift">Thrift</option>
                                <option value="Library">Library</option>
                                <option value="Bookstore">Bookstore</option>
                            </select>
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Email</label>
                            <input
                                type="email"
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Address</label>
                            <input
                                type="text"
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">URL</label>
                            <input
                                type="url"
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        {page() === 'library' ?
                            <>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">Physical address of the sale</label>
                                    <input
                                        type="text"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={physicalAddressSale}
                                        onChange={(e) => setPhysicalAddressSale(e.target.value)}
                                    />
                                </div>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">Start date</label>
                                    <input
                                        type="date"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">End date</label>
                                    <input
                                        type="date"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">Hours of the sale</label>
                                    <input
                                        type="text"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={hoursSale}
                                        onChange={(e) => setHoursSale(e.target.value)}
                                    />
                                </div>
                            </>
                            : ''}
                        <div className="py-2">
                            <label className="text-sm text-gray-700">30-day visibility</label>
                            <input
                                type="number"
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                            />
                        </div>
                        <PricingComponent />

                        <ButtonComponent rounded full
                            color="blue" className="!my-1"
                            onClick={openPaymentMethodsModal}
                            id="manage-payment-btn"
                        >
                            Manage Payment Methods
                        </ButtonComponent>
                        <div className="">
                            <ButtonComponent rounded full color="blue"
                                type="button"
                                onClick={handleSubscriptionModal}

                            >
                                Manage Subscription
                            </ButtonComponent>

                        </div>
                        <div className="mt-4">
                            <ButtonComponent rounded full color="blue"

                                type="submit"

                            >
                                Submit
                            </ButtonComponent>

                        </div>
                    </form>
                </div>
            </div>
            <SubscriptionModal
                isSubscriptionModalOpen={isSubscriptionModalOpen}
                closeSubscriptionModal={closeSubscriptionModal}
            />
            <UnsubscribeModal
                isUnsubscribeModalOpen={isUnsubscribeModalOpen}
                handleSubscriptionModal={closeUnsubModal}
                loading={subLoading}
                cancelMessage={cancelMessage}
                cancelbtn={handleUnsubscribe}
                closebtn={closeUnsubModal}
            />
            <PaymentMethodsModal
                isOpen={isPaymentMethodsModalOpen}
                onClose={closePaymentMethodsModal}
            />
            <ManageSubscriptionModal
                unsubscribeHandler={handleUnsubscribe}
                visible={isManageSubscriptionModalOpen}
                onClose={closeManageSubscriptionModalHandler}
                subscriptionData={subscriptionData}
                subscriptionStatus={subscriptionStatus}
            />


        </div>
    );
};

export default ProfileComponent;
