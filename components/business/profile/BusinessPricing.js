import { useEffect, useState } from "react";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";
import TooltipComponent from "@/components/utility/Tooltip";
import Link from "next/link";

const BusinessPricing = ({ membership, businessID }) => {
  const isStripeLive = true;

  const livePricingData = [
    {
      price: [4.99, 4.49, 3.99],
      amount: 500,
      link: [
        "https://buy.stripe.com/5kA03fewI8Vw2UE3cg",
        "https://buy.stripe.com/aEU3frewI3Bc2UEaEJ",
        "https://buy.stripe.com/8wMbLXcoAc7I8eYbIO",
      ],
    },
    {
      price: [9.99, 8.99, 7.99],
      amount: 1100,
      link: [
        "https://buy.stripe.com/cN27vH74gc7I9j27sz",
        "https://buy.stripe.com/cN26rD1JWfjU3YIbIQ",
        "https://buy.stripe.com/eVa2bnbkwb3Ean68wF",
      ],
    },
    {
      price: [19.99, 17.99, 15.99],
      amount: 2500,
      link: [
        "https://buy.stripe.com/9AQ8zL0FSefQdzi7sC",
        "https://buy.stripe.com/14k2bn60c2x8cve9AL",
        "https://buy.stripe.com/bIY17j3S48Vwdzi5kw",
      ],
    },
    {
      price: [34.99, 31.49, 27.99],
      amount: 5000,
      link: [
        "https://buy.stripe.com/28o3fr9cob3EfHq28l",
        "https://buy.stripe.com/4gw03fgEQ1t42UE28m",
        "https://buy.stripe.com/8wM7vHdsEb3Ean600f",
      ],
    },
    {
      price: [49.99, 44.99, 39.99],
      amount: 8000,
      link: [
        "https://buy.stripe.com/00g17jfAMfjU66QfZe",
        "https://buy.stripe.com/7sI03f4W8dbM8eY4gx",
        "https://buy.stripe.com/fZeaHT74g4FggLu6oG",
      ],
    },
    {
      price: [99.99, 89.99, 79.99],
      amount: 20000,
      link: [
        "https://buy.stripe.com/7sI5nzewIdbM52M4gz",
        "https://buy.stripe.com/6oE3frfAMc7Idzi6oI",
        "https://buy.stripe.com/eVa9DP0FSfjU8eY00l",
      ],
    },
  ];

  const testPricingData = [
    {
      price: [4.99, 4.49, 3.99],
      amount: 500,
      link: [
        "https://buy.stripe.com/test_bIY4ie5L95zaeSQ9AA",
        "https://buy.stripe.com/test_9AQaGCehFaTu264145",
        "https://buy.stripe.com/test_7sIeWSflJd1C5igaEG",
      ],
    },
    {
      price: [9.99, 8.99, 7.99],
      amount: 1100,
      link: [
        "https://buy.stripe.com/test_6oE9CyddBgdOh0YcMP",
        "https://buy.stripe.com/test_9AQ8yu7Thf9K9yw4gk",
        "https://buy.stripe.com/test_5kA01Y8Xl3r2fWU3ch",
      ],
    },
    {
      price: [19.99, 17.99, 15.99],
      amount: 2500,
      link: [
        "https://buy.stripe.com/test_3cs6qm3D15za7qo3ci",
        "https://buy.stripe.com/test_cN2cOK1uT5zacKI7sz",
        "https://buy.stripe.com/test_00gcOK2yX6De9yw7sA",
      ],
    },
    {
      price: [34.99, 31.49, 27.99],
      amount: 5000,
      link: [
        "https://buy.stripe.com/test_aEU5mi8Xl7Hi7qo9AJ",
        "https://buy.stripe.com/test_cN27uq7Th4v64ecbIS",
        "https://buy.stripe.com/test_aEU8yub5te5G5ig28j",
      ],
    },
    {
      price: [49.99, 44.99, 39.99],
      amount: 8000,
      link: [
        "https://buy.stripe.com/test_8wMdSO5L93r29ywdR2",
        "https://buy.stripe.com/test_00geWS4H5e5G6mkeV7",
        "https://buy.stripe.com/test_3cs3ea6PdbXy6mk8wK",
      ],
    },
    {
      price: [99.99, 89.99, 79.99],
      amount: 20000,
      link: [
        "https://buy.stripe.com/test_aEUeWS2yXgdOeSQ9AP",
        "https://buy.stripe.com/test_3cs5mia1p0eQ5ig6oE",
        "https://buy.stripe.com/test_cN22a6gpNaTu264cN3",
      ],
    },
  ];

  const pricingData = isStripeLive ? livePricingData : testPricingData;

  const [value, setValue] = useState(0.0);
  //const stepValue = (v) => Math.round(v * 60) / 10;

  const stepValue = (v) => {
    if (v <= 0.16) {
      return 0;
    }

    if (v <= 0.32) {
      return 0.2;
    }

    if (v <= 0.48) {
      return 0.4;
    }

    if (v <= 0.64) {
      return 0.6;
    }

    if (v <= 0.8) {
      return 0.8;
    }

    if (v > 0.8) {
      return 1;
    }
  };

  useEffect(() => {}, [value]);

  const getIndex = () => {
    if (value === 0) {
      return 0;
    } else {
      return Math.round(value * 5);
    }
  };

  const getSubIndex = () => {
    if (membership === "FREE") {
      return 0;
    }
    if (membership === "BASIC") {
      return 1;
    }
    if (membership === "PREMIUM") {
      return 2;
    }
  };

  const getAmount = () => {
    return pricingData[getIndex()]?.amount;
  };

  const getTotal = () => {
    return pricingData[getIndex()]?.price[getSubIndex()];
  };

  const getEach = () => {
    const rawPrice =
      pricingData[getIndex()]?.price[getSubIndex()] /
      pricingData[getIndex()]?.amount;
    return rawPrice ? rawPrice.toFixed(3) : null;
  };

  const linkHandler = () => {
    return membership
      ? pricingData[getIndex()].link[getSubIndex()]
      : "https://bibliopal.com/business/profile";
  };

  return (
    <div className="pb-4 sm:pb-8">
      <div className="flex items-center sm:mt-12 mb-4 mt-5">
        <h3 className="text-lg sm:text-2xl font-semibold">
          Buy More Upload Credits
        </h3>
        <TooltipComponent
          rounded
          placement="rightStart"
          width="sm:!w-64 !w-48"
          id="shipping-status-tooltip"
          css={{ zIndex: 10000 }}
          content={
            "Running low on upload credits? Top them off with a one time purchase. Basic plan members get 10% off and Premium plan members get 20% off."
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
        <Link
          className="sm:mx-2 duration-300 ease-in-out hover:bg-white font-bold border hover:border-green-600 bg-green-600 text-white px-12 hover:text-green-600 py-3 mx-auto rounded-full"
          href={`${linkHandler()}?client_reference_id=${
            businessID ? businessID : ""
          }`}
        >
          Buy
        </Link>
      </div>
    </div>
  );
};

export default BusinessPricing;
