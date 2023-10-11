import Image from "next/image";
import { useEffect, useState } from "react";
import { Checkbox, Loading } from "@nextui-org/react";
import TooltipComponent from "../../utility/Tooltip";
import NotificationContainer from "@/components/containers/NotificationContainer";
import { useUser } from "@/context/UserContext";

const PricePreferences = ({ user }) => {
  const { fetchUserData } = useUser();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [includeTotalCost, setIncludeTotalCost] = useState(true);

  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notificationType, setNotificationType] = useState("");

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePreferencesSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/business/updatePricePreferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: selectedPreferences, includeTotalCost }),
    });

    if (!response.ok) {
      setLoading(false);
      setNotificationType("error");
      setNotifications([
        "An error occured while updating your preferences. Please try again.",
      ]);
      return;
    }

    const data = await response.json();
    await fetchUserData();
    setLoading(false);
    setNotificationType("generic");
    setNotifications(["Preferences Updated Successfully"]);

    return data;
  };

  const dropdownIconStyle = isDropdownOpen ? "rotate-90" : "-rotate-90";

  useEffect(() => {
    if (user) {
      setSelectedPreferences(user.business.pricePreferences);
      setIncludeTotalCost(user.business.useTotalPrice);
    }
  }, [user]);

  useEffect(() => {
    if (selectedPreferences.length > 1 && selectedPreferences.includes("all")) {
      if (selectedPreferences[0] === "all") {
        const filteredPreferences = selectedPreferences.filter(
          (preference) => preference !== "all"
        );
        setSelectedPreferences(filteredPreferences);
      } else {
        setSelectedPreferences(["all"]);
      }
    }
  }, [selectedPreferences]);

  return (
    <div className="w-full shadow-md py-5 my-10 px-2">
      <div className="flex w-full ">
        <div className="flex w-3/4">
          <h1 className="text-lg sm:text-2xl font-bold">
            Price Data Preferences
          </h1>
          <div className="">
            <TooltipComponent
              rounded
              placement="rightStart"
              width="sm:!w-64 !w-48"
              id="shipping-status-tooltip"
              css={{ zIndex: 10000 }}
              content={
                "Here you can set which merchants you would like pricing data from when scanning books. Pricing data for a title may not always be available from a given merchant."
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 ml-3 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </TooltipComponent>
          </div>
        </div>
        <div className="flex flex-col w-1/4 justify-center ">
          <Image
            src={"/images/icons/icon-chevron.svg"}
            width={24}
            height={24}
            alt="dropdown icon"
            className={`bg-slate-400 origin-center ${dropdownIconStyle} rounded-full cursor-pointer self-end`}
            onClick={handleDropdownClick}
          />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="flex flex-col">
          <Checkbox.Group
            color="secondary"
            defaultValue={["all"]}
            label="Select Merchants"
            value={selectedPreferences}
            onChange={setSelectedPreferences}
          >
            <Checkbox value="amazon">Amazon</Checkbox>
            <Checkbox value="abebooks">Abebooks</Checkbox>
            <Checkbox value="alibris">Alibris</Checkbox>

            <div className="mt-5 flex justify-center items-center py-1">
              <div className="border-b w-full border-black border-dashed"></div>
              <h2 className="px-2">OR</h2>
              <div className="border-b w-full border-black border-dashed"></div>
            </div>

            <Checkbox value="all">All Merchants</Checkbox>
          </Checkbox.Group>
          <div className="border-t border-black mt-5 pb-5">
            <Checkbox
              isSelected={includeTotalCost}
              onChange={setIncludeTotalCost}
              className="pt-5"
              color="secondary"
            >
              Include shipping cost in price data?
            </Checkbox>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <button
              onClick={handlePreferencesSubmit}
              className="self-center py-3 px-8 bg-[#39aee9] border border-black text-white rounded-full"
            >
              Update
            </button>
          )}
        </div>
      )}
      <NotificationContainer
        notifications={notifications}
        setNotifications={setNotifications}
        type={notificationType}
        seType={setNotificationType}
      />
    </div>
  );
};

export default PricePreferences;
