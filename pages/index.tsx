import Head from "next/head";
import Layout, { siteTitle } from "../components/common/layout";
import Testimonials from "../components/common/Testimonials";
import {
  Container,
  VStack,
  Link,
  SimpleGrid,
  GridItem,
  Box,
  Image,
  Badge,
  useBreakpointValue,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import { StarIcon } from "@chakra-ui/icons";

export default function Home({
  posts,
}: {
  posts: {
    userId?: number;
    id?: number;
    title?: string;
    body?: string;
  }[];
}) {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const property = {
    imageUrl:
      "https://media.istockphoto.com/photos/indian-young-woman-teacher-student-elearning-remote-training-watching-picture-id1262282977?k=20&m=1262282977&s=612x612&w=0&h=NW33DZxGi2YGQm3KKms_DBt2HDBHlY0t7ClhigAxeS8=",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    reviewCount: 34,
    rating: 4,
  };

  const colSpan = useBreakpointValue({ base: 3, md: 1 });

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Stack bg={bgColor}>
        <Container maxW="container.xl">
          <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
              <Heading fontSize={"3xl"}>Feature Articles</Heading>
            </Stack>
            <SimpleGrid columns={3} columnGap={6} rowGap={6} w="full">
              {posts.slice(0, 6).map((post) => {
                return (
                  <GridItem colSpan={colSpan}>
                    <NextLink
                      as={`/post/${post.id}`}
                      href={`/post/[id]`}
                      passHref
                      key={`/post/${post.id}`}
                    >
                      <Link>
                        <Box
                          maxW="sm"
                          borderWidth="1px"
                          borderRadius="lg"
                          overflow="hidden"
                        >
                          <Image
                            src={property.imageUrl}
                            alt={property.imageAlt}
                          />

                          <Box p="6">
                            <Box
                              mt="1"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                              fontSize="2xl"
                              textTransform="capitalize"
                            >
                              {post.title}
                            </Box>

                            <Box mt="2" isTruncated textTransform="capitalize">
                              {post.body}
                            </Box>

                            <Box display="flex" mt="2" alignItems="center">
                              {Array(5)
                                .fill("")
                                .map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    color={
                                      i < property.rating
                                        ? "teal.500"
                                        : "gray.300"
                                    }
                                  />
                                ))}
                              <Box
                                as="span"
                                ml="2"
                                color="gray.600"
                                fontSize="sm"
                              >
                                {property.reviewCount} reviews
                              </Box>
                            </Box>

                            <Box display="flex" alignItems="baseline" mt="2">
                              <Badge
                                borderRadius="full"
                                px="2"
                                colorScheme="teal"
                              >
                                New
                              </Badge>
                              <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ml="2"
                              >
                                {property.beds} comments &bull; {property.baths}{" "}
                                likes
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Link>
                    </NextLink>
                  </GridItem>
                );
              })}
            </SimpleGrid>
          </VStack>
        </Container>
      </Stack>
      <Container maxW="container.xl">
        <Testimonials></Testimonials>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: { posts },
  };
};
