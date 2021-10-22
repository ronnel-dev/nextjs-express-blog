import Head from "next/head";
import Layout from "../components/common/layout";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import Header from "../components/common/Header";
import {
  Container,
  VStack,
  Link,
  SimpleGrid,
  GridItem,
  Box,
  Image,
  useBreakpointValue,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";

export default function MyArticles({
  myArticles,
}: {
  myArticles: {
    userId?: number;
    id?: number;
    title?: string;
    body?: string;
  }[];
}) {
  const siteTitle = "My Articles";

  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const property = {
    imageUrl:
      "https://media.istockphoto.com/photos/indian-young-woman-teacher-student-elearning-remote-training-watching-picture-id1262282977?k=20&m=1262282977&s=612x612&w=0&h=NW33DZxGi2YGQm3KKms_DBt2HDBHlY0t7ClhigAxeS8=",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  const colSpan = useBreakpointValue({ base: 3, md: 1 });

  const removePost = async (id: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );

    const result = await res.json();
    console.log(result);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header />
      <Stack bg={bgColor}>
        <Container maxW="container.xl">
          <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
              <Heading fontSize={"3xl"}>My Articles</Heading>
            </Stack>
            <SimpleGrid columns={3} columnGap={6} rowGap={6} w="full">
              {myArticles.slice(0, 6).map((post) => {
                return (
                  <GridItem colSpan={colSpan}>
                    <Box
                      maxW={"445px"}
                      w={"full"}
                      bg={useColorModeValue("white", "gray.900")}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={6}
                      overflow={"hidden"}
                    >
                      <Box
                        h={"210px"}
                        bg={"gray.100"}
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos={"relative"}
                      >
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                          }
                          layout={"fill"}
                        />
                      </Box>
                      <Stack pt={6}>
                        <Heading
                          color={useColorModeValue("gray.700", "white")}
                          fontSize={"2xl"}
                          fontFamily={"body"}
                        >
                          {post.title}
                        </Heading>
                        <Text color={"gray.500"}>{post.body}</Text>
                      </Stack>

                      <Flex alignItems="flex-end">
                        <Stack
                          mt={6}
                          direction={"row"}
                          spacing={4}
                          align={"center"}
                        >
                          <Stack
                            direction={"column"}
                            spacing={0}
                            fontSize={"sm"}
                          >
                            <Text fontWeight={600}>Date Posted:</Text>
                            <Text color={"gray.500"}>
                              Feb 08, 2021 · 6min read
                            </Text>
                          </Stack>
                        </Stack>
                        <Spacer />
                        <Button
                          onClick={() => removePost(post.id)}
                          colorScheme="red"
                          size="xs"
                        >
                          Delete
                        </Button>
                        <NextLink
                          as={`/edit-post/${post.id}`}
                          href={`/edit-post/[id]`}
                          passHref
                          key={`/edit-post/${post.id}`}
                        >
                          <Link>
                            <Button ml={2} colorScheme="blue" size="xs">
                              Edit
                            </Button>
                          </Link>
                        </NextLink>
                      </Flex>
                    </Box>
                  </GridItem>
                );
              })}
            </SimpleGrid>
          </VStack>
        </Container>
      </Stack>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const blogs = (await import("../lib/blogs.json")).default;
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const myArticles = await res.json();

  return {
    props: { myArticles },
  };
};
