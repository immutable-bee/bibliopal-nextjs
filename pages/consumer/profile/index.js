import React, { useState } from "react";
import styles from "./profile.module.scss";
import Image from "next/image";
import TooltipComponent from "@/components/utility/Tooltip";
import Link from "next/link";
// import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import PricingComponent from "@/components/scoped/Pricing";
import HeaderComponent from "@/components/customer/HeaderComponent";
import FreePlan from "../../../assets/free.png";
import BookWorm from "../../../assets/worm.webp";
import Tier2 from "../../../assets/owl.png";
import CloseCircle from "../../../public/images/close-circle.svg";
import CopySVG from "../../../public/images/copy.svg";
import { signOut } from "next-auth/react";
import { useUser } from "../../../context/UserContext";
import UsernameInput from "../../../components/customer/profile/UsernameInput";
import Alerts from "../../../components/customer/profile/Alerts";

const Profilecomponent = () => {
  const { user, updateUserUsername, fetchUserData } = useUser();

  const [type, setType] = useState([]);

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
            <div className="flex items-center mt-6">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={type}
                  onChange={() => setType(!type)}
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

            <div>
              <h3 className="text-xl mt-2 sm:mt-7 font-medium">Book Alerts</h3>
            </div>

            <Alerts
              props={{
                email: user?.email,
                titles: user?.consumer.tracked_titles,
                authors: user?.consumer.tracked_authors,
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
            <PricingComponent />

            <div className="flex justify-center pb-20 mt-5">
              <button
                onClick={() => signOut()}
                className="px-10 py-3 bg-blbBlue rounded text-white border border-black"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Profilecomponent;
