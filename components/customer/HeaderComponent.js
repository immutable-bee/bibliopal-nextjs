import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
// import 'bootstrap/dist/css/bootstrap.css';
import ProfileSVG from "../../public/images/profile-icon.svg";
import BookWorm from "../../assets/owl.png";
import { useUser } from "../../context/UserContext";
const HeaderComponent = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const linkColor = (path) => {
    return router.pathname === path ? "#9BCC2C" : "#828282";
  };
  console.log("router ::::::::::::::::::::", router);
  return (
    <header className="flex  mx-auto w-full justify-between items-center px-2 sm:px-4 py-3">
      <button onClick={() => setOpen(!open)} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div>
        <Link href="">
          <Image
            src="/images/logo1.png"
            width={120}
            height={58}
            className="w-20 sm:w-36"
            alt="logo"
          />
        </Link>
      </div>

      <div class={` hidden sm:static absolute right-4 left-4 top-14 z-50 md:block md:w-auto ${open ? '!block bg-gray-50' : ''} `} id="navbar-default">
        <ul class="font-medium sm:w-auto w-full text-lg flex flex-col p-4 md:p-0 mt-4 border border-gray-100 sm:border-transparent rounded-lg sm:bg-transparent  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
          <li>
            <Link href="/consumer" style={{ color: linkColor("/consumer") }} class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 " aria-current="page">Home</Link>
          </li>

          <li>
            <Link href="/consumer/matches" style={{ color: linkColor("/consumer/matches") }} class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Matches</Link>
          </li>

        </ul>
      </div>

      <Link
        href="/customer/profile"
        className="flex items-center no-underline"
      >
        {" "}
        <div className="border rounded-full w-14 h-14 flex-shrink-0 flex items-center justify-center">
          <Image
            src={BookWorm}
            width={40}
            height={40}
            className="w-10 rounded-full"
            alt="logo"
          />
        </div>
        <span className="!ml-3 hidden sm:block text-black font-semibold text-lg">
          Hi, Demo User!
        </span>
      </Link>


    </header>
    // <header className="flex  mx-auto w-full justify-between items-center px-3 sm:px-4 py-3">
    //   <div>
    //     <Link href="">
    //       <Image
    //         src="/images/logo1.png"
    //         width={120}
    //         height={58}
    //         className="w-20 sm:w-36"
    //         alt="logo"
    //       />
    //     </Link>
    //   </div>

    //   <div className="flex items-center">
    //     <Link className="no-underline	" href="/consumer">
    //       <span
    //         style={{ color: linkColor("/consumer") }}
    //         className="!mx-2 font-medium sm:!mx-5 text-base sm:text-2xl"
    //       >
    //         {" "}
    //         Home
    //       </span>
    //     </Link>
    //     <Link className="no-underline	" href="/consumer/matches">
    //       <span
    //         style={{ color: linkColor("/consumer/matches") }}
    //         className="!mx-2 font-medium sm:!mx-5 text-base sm:text-2xl"
    //       >
    //         {" "}
    //         Matches
    //       </span>{" "}
    //     </Link>
    //   </div>

    //   <div className="flex items-center">
    //     <Link
    //       href="/consumer/profile"
    //       className="flex items-center no-underline"
    //     >
    //       {" "}
    //       <div className="border rounded-full w-14 h-14 flex-shrink-0 flex items-center justify-center">
    //         <Image
    //           src={BookWorm}
    //           width={40}
    //           height={40}
    //           className="w-10 rounded-full"
    //           alt="logo"
    //         />
    //       </div>
    //       <span className="!ml-3 hidden sm:block text-black font-semibold text-lg">
    //         {user?.consumer.username ? `Hi, ${user.consumer.username}!` : ""}
    //       </span>
    //     </Link>
    //   </div>
    // </header>
  );
};

export default HeaderComponent;
