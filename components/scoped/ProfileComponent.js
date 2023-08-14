import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ManageSubscriptionModal from "@/components/scoped/ManageSubscriptionModal";
import SubscriptionModal from "@/components/scoped/SubscriptionModal";
import UnsubscribeModal from "@/components/scoped/UnsubscribeModal";
import ButtonComponent from "@/components/utility/Button";
import { useUser } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import BusinessPricing from "../business/profile/BusinessPricing";
import { Tooltip } from "@nextui-org/react";
const ProfileComponent = ({}) => {
  const { user, fetchUserData } = useUser();

  const [formData, setFormData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/business/updateData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, data: formData }),
      });
      fetchUserData();
    } catch (error) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
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

  const remainingCreditsHandler = () => {
    switch (user.business.membership) {
      case "FREE":
        return 250 - user.business.current_cycle_uploads;

      case "BASIC":
        return 1000 - user.business.current_cycle_uploads;

      case "PREMIUM":
        return 5000 - user.business.current_cycle_uploads;
    }
  };

  const handleInventoryReset = async () => {
    const response = await fetch("/api/business/resetInventory");
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
                name="business_name"
                type="text"
                className="bg-white form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                onChange={handleChange}
                placeholder={
                  user?.business?.business_name
                    ? user.business.business_name
                    : ""
                }
              />
            </div>
            <div className="py-2">
              <label className="text-sm text-gray-700">Store Type</label>
              <select
                name="type"
                value={user?.business?.type}
                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-select border border-gray-500 w-full rounded-lg  px-3 my-1 py-2"
                onChange={handleChange}
              >
                <option value="THRIFT">Thrift</option>
                <option value="LIBRARY">Library</option>
                <option value="BOOKSTORE">Bookstore</option>
              </select>
            </div>

            <div className="py-2">
              <label className="text-sm text-gray-700">Street Address</label>
              <input
                name="business_street"
                type="text"
                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                onChange={handleChange}
                placeholder={
                  user?.business?.business_street
                    ? user.business.business_street
                    : ""
                }
              />
            </div>
            <div className="py-2 mb-5">
              <label className="text-sm text-gray-700">URL</label>
              <input
                name="url"
                type="url"
                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                onChange={handleChange}
                placeholder={user?.business?.url ? user.business.url : ""}
              />
            </div>

            <div className="my-5">
              <ButtonComponent rounded full color="blue" type="submit">
                Submit
              </ButtonComponent>
            </div>

            <div className="flex justify-center">
              <Tooltip
                content={
                  "Delete all listings in your inventory. Also deletes any scheduled book sales"
                }
              >
                <button className="text-white text-sm px-8 py-2 mt-5 bg-blbBlue border border-black rounded-full">
                  Reset Inventory
                </button>
              </Tooltip>
            </div>

            <div className="mt-10">
              <h6 className="mb-5 text-2xl font-bold text-center">
                Upload Credits
              </h6>
              <div className="flex gap-5 justify-center">
                <div className="flex justify-center items-center mt-5">
                  <h3 class="text-xl font-medium mr-3">Membership</h3>
                  <input
                    type="number"
                    value={user?.business ? remainingCreditsHandler() : ""}
                    className="px-3 py-3 w-32 rounded-xl border-2 border-gray-500"
                    disabled
                  />
                </div>
                <div className="flex justify-center items-center mt-5">
                  <h3 class="text-xl font-medium mr-3">Purchased</h3>
                  <input
                    type="number"
                    value={user?.business?.upload_credits}
                    className="px-3 py-3 w-32 rounded-xl border-2 border-gray-500"
                    disabled
                  />
                </div>
              </div>
            </div>

            <BusinessPricing />

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
        <button
          className="bg-blbBlue border border-black rounded-lg px-8 py-2 mb-10 text-white"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
      <SubscriptionModal isSubscriptionModalOpen={isSubscriptionModalOpen} />
    </div>
  );
};

export default ProfileComponent;
