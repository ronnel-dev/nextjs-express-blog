import { IPost, IPostClient } from "../../Interface/interfaces";

export class PostClient implements IPostClient {
  private API_URL = "https://jsonplaceholder.typicode.com/posts";

  public async index(): Promise<Array<IPost>> {
    const res = await fetch(`${this.API_URL}`);
    const post: IPost[] = await res.json();

    return post;
  }

  public async show(id: number): Promise<IPost> {
    const res = await fetch(`${this.API_URL}/${id}`);
    const post: IPost = await res.json();

    return post;
  }

  public async store(payload: IPost): Promise<IPost> {
    const res = await fetch(`${this.API_URL}/`, {
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
  }

  public async update(payload: IPost): Promise<IPost> {
    const res = await fetch(`${this.API_URL}/${payload.id}`, {
      body: JSON.stringify({
        userId: 1,
        title: payload.title,
        body: payload.body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const result = await res.json();
    return result;
  }

  public async destroy(id: number): Promise<IPost> {
    const res = await fetch(`${this.API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    const result = await res.json();

    return result;
  }
}
