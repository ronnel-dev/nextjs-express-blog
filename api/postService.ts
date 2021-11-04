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

export const createPost = async (payload: IPost): Promise<IPost> => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
      body: JSON.stringify({
        userId: payload.userId,
        title: payload.title,
        body: payload.body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    error.statusCode = 404;
    return {};
  }
};

export const editPost = async (payload: IPost): Promise<IPost> => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${payload.id}`,
      {
        body: JSON.stringify({
          userId: 1,
          title: payload.title,
          body: payload.body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );

    const result = await res.json();
    return result;
  } catch (error) {
    error.statusCode = 404;
    return {};
  }
};

export const deletePost = async (id: number): Promise<IPost> => {
  try {
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

    return result;
  } catch (error) {
    error.statusCode = 404;
    return {};
  }
};
