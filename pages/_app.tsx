import { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light"></ColorModeScript>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
