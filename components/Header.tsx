import { Stack, Title } from "@mantine/core";
import Link from "next/link";
import Logo from "../public/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import ProfileSVG from "../public/images/profile-icon.svg";
import BookWorm from '../assets/favicon2.webp'
function Header() {
  const router = useRouter();


  const linkColor = (path: string) => {
    return router.pathname === path ? "#2EAAED" : "#828282";
  };
  return (
    <header className="flex  mx-auto w-full justify-between items-center px-2 sm:px-4 py-3">
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

   
    <nav className="text-center">
      <Link href="/">
        <span
          style={{ color: linkColor("/") }}
          className="!mx-2 font-medium sm:!mx-5 text-base sm:text-2xl"
        >
          Listing
        </span>
      </Link>

      <Link href="/customer">
        <span
          style={{ color: linkColor("/customer") }}
          className="!mx-2 font-medium sm:!mx-5 text-base sm:text-2xl"
        >
          Customer
        </span>
      </Link>
    </nav>

    <div className="flex items-center">
      <Link
        href="/profile"
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
    </div>
  </header>
  );
}

export default Header;
