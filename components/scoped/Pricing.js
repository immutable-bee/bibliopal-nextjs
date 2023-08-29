import { useEffect, useState } from "react";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";
import TooltipComponent from "@/components/utility/Tooltip";

const Pricing = () => {
  const pricingData = [
    {
      price: 2.99,
      amount: 5,
      link: "https://buy.stripe.com/cN2g2d74g5Jk1QAeVk",
    },
    {
      price: 4.99,
      amount: 10,
      link: "https://buy.stripe.com/7sI6rD9codbMan614v",
    },
    {
      price: 9.99,
      amount: 25,
      link: "https://buy.stripe.com/28oeY9coA0p0an63cE",
    },
    {
      price: 14.99,
      amount: 50,
      link: "https://buy.stripe.com/4gw17j3S45Jk3YI28B",
    },
    {
      price: 19.99,
      amount: 100,
      link: "https://buy.stripe.com/3cs5nzgEQefQcve6oS",
    },
    {
      price: 29.99,
      amount: 200,
      link: "https://buy.stripe.com/8wMdU588k7Rs1QA9B5",
    },
    {
      price: 39.99,
      amount: 300,
      link: "https://buy.stripe.com/bIYaHT4W81t43YIdRm",
    },
    {
      price: 49.99,
      amount: 500,
      link: "https://buy.stripe.com/14k8zL60c1t4fHq28F",
    },
    {
      price: 74.99,
      amount: 800,
      link: "https://buy.stripe.com/dR617jgEQfjUcvecNk",
    },
    {
      price: 99.99,
      amount: 1200,
      link: "https://buy.stripe.com/eVa3frfAMefQeDm3cL",
    },
  ];

  const subscriptionPricingData = [
    {
      price: 2.99,
      amount: 6,
      link: "https://buy.stripe.com/5kA4jvbkwgnYbra9Ba",
    },
    {
      price: 4.99,
      amount: 13,
      link: "https://buy.stripe.com/3cscQ1coA0p09j24gR",
    },
    {
      price: 9.99,
      amount: 31,
      link: "https://buy.stripe.com/14keY960cfjU2UEfZA",
    },
    {
      price: 14.99,
      amount: 63,
      link: "https://buy.stripe.com/fZe4jv0FSdbM3YI3cP",
    },
    {
      price: 19.99,
      amount: 125,
      link: "https://buy.stripe.com/6oE7vH1JWefQfHq3cQ",
    },
    {
      price: 29.99,
      amount: 250,
      link: "https://buy.stripe.com/7sI5nzdsEc7Icve00F",
    },
    {
      price: 39.99,
      amount: 375,
      link: "https://buy.stripe.com/14k4jvdsEb3Ebra4gW",
    },
    {
      price: 49.99,
      amount: 625,
      link: "https://buy.stripe.com/3cseY9coAb3E7aU4gX",
    },
    {
      price: 74.99,
      amount: 1000,
      link: "https://buy.stripe.com/eVaeY988kdbMdziaFm",
    },
    {
      price: 99.99,
      amount: 1500,
      link: "https://buy.stripe.com/5kAcQ1agsdbM0Mw9Bj",
    },
  ];

  const [isSubscription, setIsSubscription] = useState(false);
  const [value, setValue] = useState(0.1);
  const stepValue = (v) => Math.round(v * 10) / 10;

  const handleIsSubscriptionChange = (e) => {
    const newValue = e.target.checked;
    setIsSubscription(newValue);
  };

  useEffect(() => {}, [value]);

  const priceDataHandler = () => {
    return isSubscription ? subscriptionPricingData : pricingData;
  };

  const getIndex = () => {
    if (value === 1) {
      setValue(0);
      return;
    } else if (value === 0) {
      return 0;
    } else {
      return value * 10;
    }
  };

  const getAmount = () => {
    return priceDataHandler()[getIndex()]?.amount;
  };

  const getTotal = () => {
    return priceDataHandler()[getIndex()]?.price;
  };

  const getEach = () => {
    const rawPrice =
      priceDataHandler()[getIndex()]?.price /
      priceDataHandler()[getIndex()]?.amount;
    return rawPrice ? rawPrice.toFixed(2) : null;
  };

  const handleTextHighlight = () => {
    return isSubscription
      ? "ml-3 text-sm font-medium text-black dark:text-black"
      : "ml-3 text-sm font-medium text-gray-900 dark:text-gray-300";
  };

  return (
    <div className="pb-4 sm:pb-8">
      <div className="flex items-center sm:mt-12 mb-4 mt-5">
        <h3 className="text-2xl font-semibold">Buy More Alerts</h3>
        <TooltipComponent
          rounded
          placement="rightStart"
          width="!w-64"
          id="shipping-status-tooltip"
          css={{ zIndex: 10000 }}
          content={
            "An alert is used each time we find a match to your tracked titles and authors. You may purchase more alerts here. You can also make any purchase recurring for 25% more alerts each month. If you begin a recurring purchase, you will be able to cancel at any time."
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

      <div className="flex justify-center mt-7 mb-10">
        <input
          value={getAmount()}
          className="px-3 py-2 w-20 rounded-lg border-2 border-gray-500 text-center"
          disabled
        />
      </div>
      <div className="relative w-20 mx-auto">
        <div className="flex justify-center">
          <CircularInput
            value={stepValue(value)}
            onChange={(v) => setValue(stepValue(v))}
          >
            <CircularTrack />
            <CircularProgress />
            <CircularThumb />

            <text
              x={100}
              y={100}
              textAnchor="middle"
              dy="0.3em"
              fontWeight="bold"
            >
              {`$${getEach()} `}each
            </text>
          </CircularInput>
        </div>
      </div>

      <div className="flex justify-center my-5 ">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isSubscription}
            onChange={handleIsSubscriptionChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2EAAED]"></div>
          <span className={handleTextHighlight()}>
            Recurring? 25% more alerts
          </span>
        </label>
      </div>

      <div className="flex justify-center mt-7 items-center">
        <h3 className="text-xl font-medium mr-3">Total</h3>
        <div className="border-4 rounded-full border-green-600 px-3 py-1">
          ${getTotal()}
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <button
          className="sm:mx-2 duration-300 ease-in-out hover:bg-white font-bold border hover:border-green-600 bg-green-600 text-white px-12 hover:text-green-600 py-3 mx-auto rounded-full"
          type="btn"
        >
          {isSubscription ? "Subscribe" : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default Pricing;
