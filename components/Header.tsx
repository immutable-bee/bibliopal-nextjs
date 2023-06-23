import { Stack, Title } from "@mantine/core";
import Link from "next/link";
import Logo from "../public/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();


  const linkColor = (path: string) => {
    return router.pathname === path ? "#2EAAED" : "#828282";
  };
  return (
    <header className="w-full flex justify-between items-center mx-auto px-3 sm:px-8 py-3 sm:py-4">
    <Image src={Logo} alt="Buy local books network" className="w-20 sm:w-36" />

    <nav className="text-center">
      <Link href="/">
        <span
          style={{ color: linkColor("/") }}
          className="mx-2 font-medium sm:mx-4 text-base sm:text-xl"
        >
          Listing
        </span>
      </Link>
     
      <Link href="/profile">
        <span
          style={{ color: linkColor("/profile") }}
          className="mx-2 font-medium sm:mx-4 text-base sm:text-xl"
        >
          Profile
        </span>
      </Link>
      <Link href="/customer">
        <span
          style={{ color: linkColor("/customer") }}
          className="mx-2 font-medium sm:mx-4 text-base sm:text-xl"
        >
          Customer
        </span>
      </Link>
    </nav>
  </header>
  );
}

export default Header;
