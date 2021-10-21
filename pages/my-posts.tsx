import Head from "next/head";
import Layout from "../components/common/layout";
import { Container, Flex, VStack, Link, Heading } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import NextLink from "next/link";

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

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container maxW="container.sm">
        <VStack
          align={"center"}
          spacing={{ base: 8 }}
          py={{ base: 10 }}
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            {myArticles.map((article) => {
              return (
                <NextLink
                  as={`/my-article/${article.id}`}
                  href={`/my-article/[id]`}
                  passHref
                  key={`/my-article/${article.id}`}
                >
                  <Link>
                    <Heading as="h3" size="lg">
                      {article.title}
                    </Heading>
                  </Link>
                </NextLink>
              );
            })}
          </Flex>
        </VStack>
      </Container>
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
