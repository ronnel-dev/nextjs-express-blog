import { promises as fs } from "fs";
import { PostService } from "../../api/postService";
import { IPost, IPostClient } from "../../Interface/interfaces";

class MockClient implements IPostClient {
  private async readFile(): Promise<IPost> {
    const file: any = await fs.readFile(`${__dirname}/post.json`, "utf-8");
    return JSON.parse(file) as IPost;
  }

  public API_URL = "https://jsonplaceholder.typicode.com/posts";

  public async index(): Promise<Array<IPost>> {
    const posts = [];
    posts.push(await this.readFile());

    return posts;
  }

  public async show(id: number): Promise<IPost> {
    return this.readFile();
  }

  public async store(payload: IPost): Promise<IPost> {
    return this.readFile();
  }

  public async update(payload: IPost): Promise<IPost> {
    return this.readFile();
  }

  public async destroy(id: number): Promise<IPost> {
    return this.readFile();
  }
}

describe("GET /post by id", () => {
  test("getPost", async () => {
    const postService = new PostService(new MockClient());
    return await postService.getPost(1).then(async (data) => {
      expect(data.id).toEqual(1);
    });
  });
});

describe("GET /posts", () => {
  test("getPosts", async () => {
    const postService = new PostService(new MockClient());
    return await postService.getPosts().then((data) => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("userId");
      expect(data[0]).toHaveProperty("title");
      expect(data[0]).toHaveProperty("body");
    });
  });
});
