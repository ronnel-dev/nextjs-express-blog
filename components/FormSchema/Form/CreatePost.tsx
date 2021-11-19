import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormPost } from "../../../Interface/interfaces";
import { PostService } from "../../../api/postService";
import { PostClient } from "../../../api/clients/postClient";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";

const schema = yup
  .object({
    Title: yup.string().required(),
    Body: yup.string().required(),
  })
  .required();

export default function CreatePost() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormPost>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: IFormPost) => {
    const payload = {
      title: data.Title,
      body: data.Body,
      userId: 1,
    };

    try {
      const service = new PostService(new PostClient());

      const createdPost = await service.createPost(payload);
      console.log(createdPost);
      reset();
    } catch (error) {
      error.statusCode = 404;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="Title">
          <FormLabel htmlFor="Title">Title</FormLabel>
          <Input
            id="Title"
            name="Title"
            placeholder="Title here..."
            {...register("Title", { required: true })}
          />
          {/* <Text color={"red"}>{errors.title && "Title is required"}</Text> */}
          <Text color={"red"}>{errors.Title?.message}</Text>
        </FormControl>
        <FormControl id="Body">
          <FormLabel htmlFor="Body">Content</FormLabel>
          <Textarea
            id="Body"
            name="Body"
            placeholder="Here is your content"
            rows={10}
            {...register("Body", { required: true })}
          />
          {/* <Text color={"red"}>{errors.body && "Content is required"}</Text> */}
          <Text color={"red"}>{errors.Body?.message}</Text>
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
  );
}
