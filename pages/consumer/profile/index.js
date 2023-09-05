import React, { useEffect, useState } from "react";
import TooltipComponent from "@/components/utility/Tooltip";
import Head from "next/head";
import PricingComponent from "@/components/scoped/Pricing";
import HeaderComponent from "@/components/customer/HeaderComponent";
import { signOut } from "next-auth/react";
import { useUser } from "../../../context/UserContext";
import UsernameInput from "../../../components/customer/profile/UsernameInput";
import Alerts from "../../../components/customer/profile/Alerts";
import AlertPreferences from "../../../components/customer/profile/AlertPreferences";
import ManageRecurringPurchaseModal from "../../../components/customer/profile/ManageRecurringPurchaseModal";
import NotificationContainer from "../../../components/containers/NotificationContainer";

const Profilecomponent = () => {
  const { user, updateUserUsername, fetchUserData } = useUser();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState({});
  const [isManageRecurringModalOpen, setIsManageRecurringModalOpen] =
    useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notificationType, setNotificationType] = useState(null);

  const recurringModalOpenHandler = () => {
    setIsManageRecurringModalOpen(true);
  };

  const recurringModalCloseHandler = () => {
    setIsManageRecurringModalOpen(false);
  };

  useEffect(() => {
    if (user?.consumer?.subscriptionId) {
      (async () => await fetchSubscriptionData())();
      setIsSubscribed(true);
    }
  }, [user]);

  useEffect(() => {
    if (user?.consumer?.id) {
      console.log(user.consumer.id);
      (async () => await fetchConsumerAlerts())();
    }
  }, [user]);

  const fetchConsumerAlerts = async () => {
    const response = await fetch("/api/consumer/fetchAlerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.consumer.id),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch alerts:", data.error);
    }

    setAlerts(data);
  };

  const fetchSubscriptionData = async () => {
    const response = await fetch(
      `/api/stripe/consumer/${subscriptionData.subscriptionId}`
    );
    const data = await response.json();

    if (response.ok) {
      setSubscriptionData(data);
    } else {
      console.error("Failed to fetch subscription data:", data.error);
    }
  };

  return (
    <div className="bg-[#FEFBE8] min-h-screen">
      <Head>
        <link rel="shortcut icon" href="/images/fav.png" />
      </Head>

      <div>
        <HeaderComponent />

        <section className="px-5 ">
          <div className="max-w-xl mx-auto">
            <UsernameInput
              props={{
                email: user?.email,
                username: user?.consumer.username ? user.consumer.username : "",
              }}
              onUsernameUpdate={updateUserUsername}
            />
            <AlertPreferences
              props={{
                emailAlertsOn: user?.consumer.email_alerts_on,
                alertsPaused: user?.consumer.alerts_paused,
                email: user?.email,
              }}
            />
            <div>
              <h3 className="text-xl mt-2 sm:mt-7 font-medium">Book Alerts</h3>
            </div>

            <Alerts
              props={{
                email: user?.email,
                alerts: alerts,
                zipCodes: user?.consumer.tracked_zips,
              }}
              fetchUserData={fetchUserData}
            />

            <div className="flex justify-center items-center mt-5">
              <h3 class="text-xl font-medium mr-3">Total alerts</h3>
              <input
                type="number"
                value={
                  user?.consumer.paid_alerts ? user.consumer.paid_alerts : ""
                }
                className="px-3 py-3 w-32 rounded-xl border-2 border-gray-500"
                disabled
              />
            </div>

            {/* <h3 className='text-xl mt-5 sm:mt-12 font-medium'>Subscription Plan</h3> */}
            {user?.consumer && (
              <PricingComponent consumerId={user.consumer.id} />
            )}
            {isSubscribed && (
              <div className="flex justify-center pb-10">
                <button
                  onClick={recurringModalOpenHandler}
                  className="px-10 py-3 bg-green-700 rounded-full text-white border border-black"
                >
                  Manage recurring purchase
                </button>
                <ManageRecurringPurchaseModal
                  visible={isManageRecurringModalOpen}
                  onClose={recurringModalCloseHandler}
                  subscriptionData={subscriptionData}
                  setNotifications={setNotifications}
                  setNotificationType={setNotificationType}
                  refreshUserData={fetchUserData}
                />
              </div>
            )}

            <div className="flex justify-center pb-20 mt-5">
              <button
                onClick={() => signOut()}
                className="px-10 py-3 bg-blbBlue rounded-lg text-white border border-black"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>
      </div>
      <NotificationContainer
        notifications={notifications}
        setNotifications={setNotifications}
        type={notificationType}
        setType={setNotificationType}
      />
    </div>
  );
};
export default Profilecomponent;
