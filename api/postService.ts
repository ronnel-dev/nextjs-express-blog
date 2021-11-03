import { IPost } from "../Interface/interfaces";

export const getPost = async (id: number): Promise<IPost> => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post: IPost = await res.json();

    return post;
  } catch (error) {
    error.statusCode = 404;
    return {};
  }
};

export const getPosts = async (): Promise<IPost[]> => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const post: IPost[] = await res.json();

    return post;
  } catch (error) {
    error.statusCode = 404;
    return [];
  }
};
