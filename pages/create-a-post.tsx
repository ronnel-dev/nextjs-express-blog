import Head from "next/head";
import Layout from "../components/common/layout";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

export default function CreatePost() {
  const siteTitle = "Create a Post";

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      body: { value: string };
    };
    const title = target.title.value;
    const body = target.body.value;

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      body: JSON.stringify({
        userId: 1,
        title: title,
        body: body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Create a Post</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to share all of your cool <Link color={"blue.400"}>articles</Link>{" "}
              ✌️
            </Text>
          </Stack>

          <Box
            width={"400px"}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="title">
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input type="text" id="title" name="title" required />
                </FormControl>
                <FormControl id="body">
                  <FormLabel htmlFor="body">Content</FormLabel>
                  <Textarea
                    id="body"
                    name="body"
                    placeholder="Here is a sample placeholder"
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Submit Post
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
