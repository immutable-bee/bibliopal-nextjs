import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import BookWorm from "../assets/owl.png";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
function Header() {
  const { user } = useUser();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navStyle = isMenuOpen
    ? {
        background: "linear-gradient(to top left, #d4e1ae 5% , #fefbe8 55%)",
      }
    : {};

  const linkColor = (path: string) => {
    return router.pathname === path ? "#9BCC2C" : "#828282";
  };
  return (
    <header className=" flex  mx-auto w-full justify-between items-center px-3 sm:px-4 py-3 overflow-x-auto">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden">
        <Image
          width={32}
          height={32}
          alt="Navigation Menu Icon"
          src={"/images/icons/icon-hamburgerMenu.svg"}
        />
      </button>

      <div className="w-20 sm:w-36 flex-shrink-0 pr-2 sm:pr-0">
        <Link href="/business">
          <Image
            src="/images/logo1.png"
            width={120}
            height={58}
            className="w-full"
            alt="logo"
          />
        </Link>
      </div>

      <nav
        style={navStyle}
        className={`sm:flex ${
          isMenuOpen
            ? "border border-black z-50 gap-3 block absolute top-0 left-0 h-screen bg-white p-4 flex flex-col overflow-y-auto shadow-xl "
            : "hidden"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden self-end"
        >
          <Image
            className="bg-slate-400 origin-center rounded-full p-1 self-end"
            width={24}
            height={24}
            src={"/images/icons/icon-chevron.svg"}
            alt="Close menu icon"
          />
        </button>

        <div
          className={` ${
            isMenuOpen ? " h-full pl-2 flex flex-col overflow-y-auto gap-3" : ""
          }`}
        >
          <Link href="/business">
            <span
              style={{ color: linkColor("/business") }}
              className="!mx-1 font-medium sm:!mx-5 text-sm sm:text-2xl"
            >
              Add Listings
            </span>
          </Link>

          <div
            className={`${isMenuOpen ? "border-t border-black" : "hidden"}`}
          ></div>

          <Link href="/business/uploadlistings/future">
            <span
              style={{ color: linkColor("/business/uploadlistings/future") }}
              className="!mx-1 font-medium sm:!mx-5 text-sm sm:text-2xl"
            >
              Schedule Booksale
            </span>
          </Link>

          <div
            className={`${isMenuOpen ? "border-t border-black" : "hidden"}`}
          ></div>

          <Link href="/business/managelistings">
            <span
              style={{
                color: linkColor("/business/uploadlistings/manageListings"),
              }}
              className="!mx-1 font-medium sm:!mx-5 text-sm sm:text-2xl"
            >
              Manage Listings
            </span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center">
        <Link
          href={`/business/profile`}
          className="flex items-center no-underline"
        >
          {" "}
          <div className="border rounded-full w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
            <Image
              src={BookWorm}
              width={40}
              height={40}
              className="w-8 sm:w-10 rounded-full"
              alt="logo"
            />
          </div>
          <span className="!ml-3 hidden sm:block text-black font-semibold text-lg">
            {user?.business?.business_name
              ? `Hi, ${user.business.business_name}!`
              : ""}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
