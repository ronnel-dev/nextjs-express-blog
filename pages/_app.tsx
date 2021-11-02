import { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark"></ColorModeScript>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
