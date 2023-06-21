import React from "react";
import "../styles/App.css";
import { MantineProvider } from "@mantine/core";
import TableDataProvider from "../context/TableDataContext";
import { AppProps } from "next/app";
import Link from "next/link";
import Logo from "../public/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const linkColor = (path: string) => {
    return router.pathname === path ? "#2EAAED" : "#828282";
  };
  return (
    <React.StrictMode>
      <div className="bg-[#FEFBE8] min-h-screen">
        <header className="w-full flex justify-between items-center px-8 py-4">
          <Image src={Logo} alt="Logo" className="w-20 sm:w-36" />

          <nav className="text-center">
            <Link href="/">
              <span
                style={{ color: linkColor("/") }}
                className="mx-2 font-medium sm:mx-4 text-base sm:text-xl"
              >
                Home
              </span>
            </Link>
            <Link href="/listing">
              <span
                style={{ color: linkColor("/listing") }}
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
          </nav>
        </header>
        <MantineProvider
          theme={{
            primaryColor: "yellow",
            defaultRadius: "md",
            colors: {
              yellow: [
                "#ffffcc",
                "#ffff99",
                "#ffff66",
                "#ffff33",
                "#ffff00",
                "#ffcc00",
                "#ffc71f",
                "#ffbf00",
                "#ffb300",
                "#ffa500",
              ],
              blue: [
                "#E4F3FF",
                "#C4E1FF",
                "#A3CEFF",
                "#81BAFF",
                "#60A7FF",
                "#3E93FF",
                "#2EAAED",
                "#1D91DA",
                "#0D78C8",
                "#006FB5",
              ],
            },
            components: {
              TextInput: {
                classNames: {
                  input: "input",
                  root: "input-root",
                  wrapper: "input-wrapper",
                },
              },
              NumberInput: {
                classNames: {
                  input: "input",
                  root: "input-root",
                  wrapper: "input-wrapper",
                },
              },
              Textarea: {
                classNames: {
                  input: "input",
                  root: "input-root",
                  wrapper: "input-wrapper",
                },
              },
              Button: {
                defaultProps: { radius: "xl", c: "gray.9", fz: "md" },
                styles: (theme) => ({
                  root: {
                    border: "2px solid",
                    borderColor: theme.black,
                  },
                }),
              },
            },
          }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
        >
          <TableDataProvider>
            <Component {...pageProps} />
          </TableDataProvider>
        </MantineProvider>
      </div>
    </React.StrictMode>
  );
}
