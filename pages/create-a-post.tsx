import Head from "next/head";
import Layout from "../components/common/layout";
import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
  Container,
  Image,
} from "@chakra-ui/react";
import React from "react";
import BloggerProfile from "../components/common/BloggerProfile";
import CreatePost from "../components/FormSchema/Form/CreatePost";

export default function CreateAPost() {
  const siteTitle = "Create a Post";
  const post = {};

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container maxW={"7xl"} pt="20"></Container>
      <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
        <Flex pl={4} flex={3} justify={"left"} w={"full"}>
          <Stack spacing={6} w={"full"}>
            <Heading as="h1">Articles by John Doe</Heading>
            <Box
              marginTop={{ base: "1", sm: "5" }}
              display="flex"
              flexDirection={{ base: "column", sm: "row" }}
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center"
              >
                <Box
                  width={{ base: "100%", sm: "85%" }}
                  zIndex="2"
                  marginLeft={{ base: "0", sm: "5%" }}
                  marginTop="5%"
                >
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Image
                      borderRadius="lg"
                      src={"https://source.unsplash.com/random/800x600"}
                      alt="some good alt text"
                      objectFit="contain"
                    />
                  </Link>
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                  <Box
                    bgGradient={useColorModeValue(
                      "radial(orange.600 1px, transparent 1px)",
                      "radial(orange.300 1px, transparent 1px)"
                    )}
                    backgroundSize="20px 20px"
                    opacity="0.4"
                    height="100%"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: "3", sm: "0" }}
              >
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Create a Post</Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    to share all of your cool{" "}
                    <Link color={"blue.400"}>articles</Link> ✌️
                  </Text>
                </Stack>
                <Stack p={8}>
                  <CreatePost post={post} />
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <BloggerProfile />
        </Flex>
      </Stack>
    </Layout>
  );
}
