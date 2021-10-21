import React from "react";
import Link from "next/link";
import {
  Button,
  Stack,
  useBreakpointValue,
  Flex,
  VStack,
  Heading,
} from "@chakra-ui/react";

export default function Header() {
  return (
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
  );
}
