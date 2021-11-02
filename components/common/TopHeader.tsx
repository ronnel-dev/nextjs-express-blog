import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Heading } from "@chakra-ui/layout";
import { FaSun, FaMoon } from "react-icons/fa";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Button,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";

export default function TopHeader() {
  const { isOpen, onToggle } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box w="full" pos="fixed" zIndex="9999">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Heading
            onClick={() =>
              window.open("https://www.fullspeedtechnologies.com/")
            }
            size="md"
            fontWeight="semibold"
            bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
            bgClip="text"
            cursor="pointer"
          >
            FullSpeed Technologies
          </Heading>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Link href="/">
              <Text cursor="pointer">Home</Text>
            </Link>
            <Link href={`/create-a-post`}>
              <Text pl={4} cursor="pointer">
                Create Post
              </Text>
            </Link>
            <Link href={`/my-posts`}>
              <Text pl={4} cursor="pointer">
                My Posts
              </Text>
            </Link>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <IconButton
            aria-label={"CloseIcon"}
            ml={8}
            icon={isDark ? <FaSun /> : <FaMoon />}
            isRound={true}
            onClick={toggleColorMode}
            size={"sm"}
          ></IconButton>
          <Link href={`/login`}>
            <Button colorScheme="teal" size="sm">
              Sign In
            </Button>
          </Link>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"sm"} src={"/images/profile.jpg"} />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar size={"2xl"} src={"/images/profile.jpg"} />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Servers</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue("gray.100", "gray.600")}
          p={4}
          display={{ md: "none" }}
        >
          <Stack>
            <Flex
              py={2}
              justify={"space-between"}
              align={"left"}
              _hover={{
                textDecoration: "none",
              }}
            >
              <List spacing={4}>
                <Link href="/">
                  <ListItem onClick={onToggle}>Home</ListItem>
                </Link>
                <Link href={`/create-a-post`}>
                  <ListItem onClick={onToggle}>Create Post</ListItem>
                </Link>
                <Link href={`/my-posts`}>
                  <ListItem onClick={onToggle}>My Posts</ListItem>
                </Link>
              </List>
            </Flex>
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
}
