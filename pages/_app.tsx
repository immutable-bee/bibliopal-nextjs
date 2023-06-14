import React from "react";
import "../styles/index.css";
import { MantineProvider } from "@mantine/core";
import TableDataProvider from "../context/TableDataContext";
import { AppProps } from "next/app";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
}
