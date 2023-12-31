import TooltipComponent from "@/components/utility/Tooltip";
import { useEffect, useState } from "react";
import * as notify from "../../../pages/api/notifier/notify";

const AlertPreferences = ({ props }) => {
  const [isEmailAlertsActive, setIsEmailAlertsActive] = useState(true);
  const [isAlertsPaused, setIsAlertsPaused] = useState(false);

  useEffect(() => {
    if (props) {
      setIsEmailAlertsActive(props.emailAlertsOn);
      setIsAlertsPaused(props.alertsPaused);
    }
  }, [props]);

  const handleEmailAlertChange = async (e) => {
    const newValue = e.target.checked;
    setIsEmailAlertsActive(newValue);

    try {
      const res = await fetch("/api/consumer/update/alertPreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          field: "email_alerts_on",
          value: newValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update email alert preferences");
      }
    } catch (error) {
      console.error(error.message);
      notify.error(error);
    }
  };

  const handleAlertsPausedChange = async (e) => {
    const newValue = e.target.checked;
    setIsAlertsPaused(newValue);

    try {
      const res = await fetch("/api/consumer/update/alertPreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          field: "alerts_paused",
          value: newValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update alerts paused preferences");
      }
    } catch (error) {
      console.error(error.message);
      notify.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center mt-6">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isEmailAlertsActive}
            onChange={handleEmailAlertChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2EAAED]"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Email alerts
          </span>
        </label>
        <TooltipComponent
          rounded
          placement="rightStart"
          width="!w-64"
          id="shipping-status-tooltip"
          css={{ zIndex: 10000 }}
          content={"Turn email alerts on or off when a new match is found."}
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

      <div className="flex items-center mt-6">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isAlertsPaused}
            onChange={handleAlertsPausedChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2EAAED]"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Pause Alerts
          </span>
        </label>
        <TooltipComponent
          rounded
          placement="rightStart"
          width="!w-64"
          id="shipping-status-tooltip"
          css={{ zIndex: 10000 }}
          content={
            "Temporarily stop finding matches. This will prevent alert credits from being spent."
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
    </>
  );
};

export default AlertPreferences;
