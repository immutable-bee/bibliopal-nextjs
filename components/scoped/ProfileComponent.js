import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ManageSubscriptionModal from "@/components/scoped/ManageSubscriptionModal";
import SubscriptionModal from "@/components/scoped/SubscriptionModal";
import UnsubscribeModal from "@/components/scoped/UnsubscribeModal";
import ButtonComponent from "@/components/utility/Button";

const ProfileComponent = ({}) => {
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
    };

    console.log(JSON);

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

  const manageSubscriptionModalHandler = () => {
    setIsManageSubscriptionModalOpen(!isManageSubscriptionModalOpen);
  };

  const handleSubscriptionModal = () => {
    // subscriptionStatus === "Not Subscribed"
    //     ?
    setIsSubscriptionModalOpen(!isSubscriptionModalOpen);
    // :
    // setIsManageSubscriptionModalOpen(!isManageSubscriptionModalOpen);
  };

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

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
  const stepValue = (v) => Math.round(v * 10) / 10;

  const closeManageSubscriptionModalHandler = () => {
    console.log("close");
    setIsManageSubscriptionModalOpen(false);
  };

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
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label className="text-sm text-gray-700">Store Type</label>
              <select
                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-select border border-gray-500 w-full rounded-lg  px-3 my-1 py-2"
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label className="text-sm text-gray-700">Address</label>
              <input
                type="text"
                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label className="text-sm text-gray-700">URL</label>
              <input
                type="url"
                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <>
              <div className="py-2">
                <label className="text-sm text-gray-700">
                  Physical address of the sale
                </label>
                <input
                  type="text"
                  className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                  onChange={(e) => setPhysicalAddressSale(e.target.value)}
                />
              </div>
              <div className="py-2">
                <label className="text-sm text-gray-700">Start date</label>
                <input
                  type="date"
                  className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="py-2">
                <label className="text-sm text-gray-700">End date</label>
                <input
                  type="date"
                  className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="py-2">
                <label className="text-sm text-gray-700">
                  Hours of the sale
                </label>
                <input
                  type="text"
                  className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                  onChange={(e) => setHoursSale(e.target.value)}
                />
              </div>
            </>

            <ButtonComponent
              rounded
              full
              color="blue"
              className="!my-1"
              id="manage-payment-btn"
            >
              Manage Payment Methods
            </ButtonComponent>
            <div className="">
              <ButtonComponent rounded full color="blue" type="button">
                Manage Subscription
              </ButtonComponent>
            </div>
            <div className="mt-4">
              <ButtonComponent rounded full color="blue" type="submit">
                Submit
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
      <SubscriptionModal isSubscriptionModalOpen={isSubscriptionModalOpen} />
    </div>
  );
};

export default ProfileComponent;
