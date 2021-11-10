import { promises as fs } from "fs";
import { PostClient } from "../../api/clients/postClient";
import { PostService } from "../../api/postService";
import { IPost, IPostClient } from "../../Interface/interfaces";

class MockClient implements IPostClient {
  private async readFile(): Promise<IPost> {
    const file: any = await fs.readFile(`${__dirname}/post.json`);
    return file;
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

describe("GET /post", () => {
  test("getPost", async () => {
    const postService = new PostService(new PostClient());
    return await postService.getPost(1).then((data) => {
      expect(data.id).toBe(1);
    });
  });
});
