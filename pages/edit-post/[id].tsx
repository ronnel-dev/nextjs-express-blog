import React from "react";
import {
  Text,
  Heading,
  Link,
  Container,
  Box,
  Image,
  useColorModeValue,
  HStack,
  Flex,
  Stack,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { NextPage, GetServerSideProps } from "next";
import Layout from "../../components/common/layout";
import BloggerProfile from "../../components/common/BloggerProfile";
import Head from "next/head";
import { editPost, getPost } from "../../api/postService";
import { IPost } from "../../Interface/interfaces";

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const BlogPage: NextPage<IPost> = (props) => {
  const handleUpdateSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      body: { value: string };
    };
    const payload = {
      title: target.title.value,
      body: target.body.value,
      id: props.id,
    };

    const result = await editPost(payload);
    console.log(result);
  };
  const siteTitle = "Edit Post";
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
                  <Heading fontSize={"4xl"}>Edit Post</Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    to share all of your cool{" "}
                    <Link color={"blue.400"}>articles</Link> ✌️
                  </Text>
                </Stack>
                <Stack p={8}>
                  <form onSubmit={handleUpdateSubmit} key={props.id}>
                    <Stack spacing={4}>
                      <FormControl id="title">
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                          defaultValue={props.title}
                          type="text"
                          id="title"
                          name="title"
                          required
                        />
                      </FormControl>
                      <FormControl id="body">
                        <FormLabel htmlFor="body">Content</FormLabel>
                        <Textarea
                          id="body"
                          name="body"
                          defaultValue={props.body}
                          rows={10}
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
                          Update Post
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
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
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  const post = await getPost(Number(id));

  return {
    props: post,
  };
};

export default BlogPage;
