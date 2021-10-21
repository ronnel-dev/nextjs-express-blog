import Head from "next/head";
import TopHeader from "./TopHeader";
import { useColorMode } from "@chakra-ui/color-mode";
import {
  Button,
  Stack,
  useBreakpointValue,
  Flex,
  VStack,
  Heading,
} from "@chakra-ui/react";
import Footer from "../common/Footer";
import Link from "next/link";

export const siteTitle = "Home";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <TopHeader />
      <header>
        {home ? (
          <>
            <Flex
              w={"full"}
              h={"50vh"}
              backgroundImage={
                "url(https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_960_720.jpg)"
              }
              backgroundSize={"cover"}
              backgroundPosition={"center center"}
            >
              <VStack
                w={"full"}
                justify={"center"}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
              >
                <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
                  <Heading
                    size="4xl"
                    fontWeight="bolder"
                    bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
                    bgClip="text"
                    cursor="pointer"
                  >
                    FullSpeed Technologies Blog
                  </Heading>
                  <Stack direction={"row"}>
                    <Link href={`/create-a-post`}>
                      <Button
                        bg={"blue.400"}
                        rounded={"full"}
                        color={"white"}
                        _hover={{ bg: "blue.500" }}
                      >
                        Write an Article
                      </Button>
                    </Link>
                  </Stack>
                </Stack>
              </VStack>
            </Flex>
          </>
        ) : (
          <>{/* <Header /> */}</>
        )}
      </header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}
