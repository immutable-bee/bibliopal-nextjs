import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ManageSubscriptionModal from "../business/profile/ManageSubscriptionModal";
import ButtonComponent from "@/components/utility/Button";
import { useUser } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import BusinessPricing from "../business/profile/BusinessPricing";
import TooltipComponent from "@/components/utility/Tooltip";
import ResetInventoryModal from "../modals/ResetInventory";
import NotificationContainer from "../containers/NotificationContainer";
import * as notify from "@/pages/api/notifier/notify";
import PricePreferences from "../business/profile/PricePreferences";

const ProfileComponent = ({}) => {
  const { user, fetchUserData } = useUser();

  const [formData, setFormData] = useState();
  const [isResetInventoryModalOpen, setIsResetInventoryModalOpen] =
    useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // for subscription notifications
  const [notifications, setNotifications] = useState([]);
  const [notificationType, setNotificationType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/business/updateData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, data: formData }),
      });

      if (response.ok) {
        fetchUserData();
        setNotificationType("profile updated");
        setNotifications([1]);
      }
    } catch (error) {
      notify.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const subscriptionModalOpenHandler = () => {
    setIsSubscriptionModalOpen(true);
  };

  const subscriptionModalCloseHandler = () => {
    setIsSubscriptionModalOpen(false);
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

  const openResetInventoryModal = () => {
    setIsResetInventoryModalOpen(true);
  };

  const closeResetInventoryModal = () => {
    setIsResetInventoryModalOpen(false);
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
                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                onChange={handleChange}
                placeholder={user?.business?.url ? user.business.url : ""}
              />
            </div>

            <div className="mt-5">
              <ButtonComponent rounded full color="blue" type="submit">
                Update
              </ButtonComponent>
            </div>

            <div className="flex justify-center w-full mt-5">
              <TooltipComponent
                tailwind="!w-full flex justify-center"
                width="max-w-lg"
                content={
                  "Delete all listings in your inventory. Also deletes any scheduled book sales"
                }
              >
                <button
                  type="button"
                  onClick={openResetInventoryModal}
                  className="text-white text-sm px-8 py-2.5 bg-red-600 border border-black rounded-full"
                >
                  Reset Inventory
                </button>
              </TooltipComponent>
            </div>

            <ResetInventoryModal
              visible={isResetInventoryModalOpen}
              closeHandler={closeResetInventoryModal}
            />

            <PricePreferences user={user} />

            <div className="mt-8">
              <h6 className="mb-5 text-2xl font-bold text-center">
                Upload Credits
              </h6>
              <div className="sm:flex gap-5 sm:justify-center">
                <div className="flex sm:justify-center justify-between items-center mt-5">
                  <h3 class="text-xl font-medium mr-3">Membership</h3>
                  <input
                    type="number"
                    value={user?.business ? remainingCreditsHandler() : ""}
                    className="px-3 sm:py-3 py-2.5 w-32 rounded-xl border-2 border-gray-500 bg-white"
                    disabled
                  />
                </div>
                <div className="flex sm:justify-center justify-between items-center mt-5">
                  <h3 class="text-xl font-medium mr-3">Purchased</h3>
                  <input
                    type="number"
                    value={user?.business?.upload_credits}
                    className="px-3 sm:py-3 py-2.5 w-32 rounded-xl border-2 border-gray-500 bg-white"
                    disabled
                  />
                </div>
              </div>
            </div>

            <BusinessPricing
              membership={user?.business.membership}
              businessID={user?.business.id}
            />

            <div className="">
              <ButtonComponent
                onClick={subscriptionModalOpenHandler}
                rounded
                full
                color="blue"
                type="button"
              >
                Manage Subscription
              </ButtonComponent>
            </div>
          </form>
          <div className="mt-4 w-full max-w-lg">
            <ButtonComponent
              full
              rounded
              color="blue"
              onClick={() => signOut()}
            >
              Sign Out
            </ButtonComponent>
          </div>
        </div>
      </div>
      <ManageSubscriptionModal
        user={user}
        visible={isSubscriptionModalOpen}
        onClose={subscriptionModalCloseHandler}
        setNotificationType={setNotificationType}
        setNotifications={setNotifications}
      />
      <NotificationContainer
        notifications={notifications}
        setNotifications={setNotifications}
        type={notificationType}
        setType={setNotificationType}
      />
    </div>
  );
};

export default ProfileComponent;
