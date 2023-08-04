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
      price: 0.99,
      amount: 3,
    },
    {
      price: 2.99,
      amount: 10,
    },
    {
      price: 4.99,
      amount: 20,
    },
    {
      price: 9.99,
      amount: 50,
    },
    {
      price: 14.99,
      amount: 80,
    },
    {
      price: 19.99,
      amount: 125,
    },
    {
      price: 29.99,
      amount: 200,
    },
    {
      price: 49.99,
      amount: 400,
    },
    {
      price: 74.99,
      amount: 750,
    },
    {
      price: 99.99,
      amount: 1200,
    },
  ];

  const [value, setValue] = useState(0.1);
  const stepValue = (v) => Math.round(v * 10) / 10;

  useEffect(() => {}, [value]);

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
    return pricingData[getIndex()]?.amount;
  };

  const getTotal = () => {
    return pricingData[getIndex()]?.price;
  };

  const getEach = () => {
    const rawPrice =
      pricingData[getIndex()]?.price / pricingData[getIndex()]?.amount;
    return rawPrice ? rawPrice.toFixed(2) : null;
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
            "Lorem ipsum dolar sit amit Lorem ipsum dolar sit amit Lorem ipsum dolar sit amit"
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
          Buy
        </button>
      </div>
    </div>
  );
};

export default Pricing;
