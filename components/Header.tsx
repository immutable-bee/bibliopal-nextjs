import { Stack, Title } from "@mantine/core";
import Link from "next/link";
import Logo from "../public/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import ProfileSVG from "../public/images/profile-icon.svg";
import BookWorm from "../assets/owl.png";
import { useUser } from "@/context/UserContext";
function Header() {
  const { user } = useUser();
  const router = useRouter();

  const linkColor = (path: string) => {
    return router.pathname === path ? "#9BCC2C" : "#828282";
  };
  return (
    <header className="flex  mx-auto w-full justify-between items-center px-3 sm:px-4 py-3 overflow-x-auto">
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

      <nav className="text-center">
        <Link href="/business">
          <span
            style={{ color: linkColor("/business") }}
            className="!mx-1 font-medium sm:!mx-5 text-sm sm:text-2xl"
          >
            Add Listings
          </span>
        </Link>

        <Link href="/business/uploadlistings/future">
          <span
            style={{ color: linkColor("/business/uploadlistings/future") }}
            className="!mx-1 font-medium sm:!mx-5 text-sm sm:text-2xl"
          >
            Schedule Booksale
          </span>
        </Link>

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
