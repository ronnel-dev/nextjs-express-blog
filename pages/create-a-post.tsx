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
  Container,
  Image,
} from "@chakra-ui/react";
import React from "react";
import BloggerProfile from "../components/common/BloggerProfile";
import { PostService } from "../api/postService";
import { PostClient } from "../api/clients/postClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormCreatePost } from "../Interface/interfaces";

export default function CreatePost() {
  const siteTitle = "Create a Post";

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormCreatePost>();

  const onSubmit: SubmitHandler<IFormCreatePost> = async (data, e) => {
    const payload = {
      title: data.title,
      body: data.body,
      userId: 1,
    };

    try {
      const service = new PostService(new PostClient());
      const createdPost = await service.createPost(payload);
      reset();
      console.log(createdPost);
    } catch (error) {
      error.statusCode = 404;
    }
  };

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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                      <FormControl id="title">
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Title here..."
                          {...register("title", { required: true })}
                        />
                        <Text color={"red"}>
                          {errors.title && "Title is required"}
                        </Text>
                      </FormControl>
                      <FormControl id="body">
                        <FormLabel htmlFor="body">Content</FormLabel>
                        <Textarea
                          id="body"
                          name="body"
                          placeholder="Here is your content"
                          rows={10}
                          {...register("body", { required: true })}
                        />
                        <Text color={"red"}>
                          {errors.body && "Content is required"}
                        </Text>
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
