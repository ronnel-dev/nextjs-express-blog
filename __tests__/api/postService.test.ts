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
    const posts = [];
    posts.push(await this.readFile());
    posts.push(await payload);
    const post = posts.find((post) => post.title === payload.title);

    return post;
  }

  public async update(payload: IPost): Promise<IPost> {
    const file: any = await fs.readFile(
      `${__dirname}/post/${payload.id}.json`,
      "utf-8"
    );
    const parse = JSON.parse(file);
    parse.title = payload.title;
    parse.body = payload.body;

    return parse;
  }

  public async destroy(id: number): Promise<IPost> {
    const file: any = await fs.readFile(
      `${__dirname}/post/${id}.json`,
      "utf-8"
    );
    const parse = JSON.parse(file);
    if (parse.id === id) {
      return {};
    } else {
      return parse;
    }
  }
}

describe("GET /posts", () => {
  test("getPosts", async () => {
    const postService = new PostService(new MockClient());
    return await postService.getPosts().then((data) => {
      expect(data.length).toBeGreaterThan(0);
    });
  });
});

describe("GET /post by id", () => {
  test("getPost", async () => {
    const postService = new PostService(new MockClient());
    return await postService.getPost(1).then(async (data) => {
      expect(data[0].id).toBe(1);
    });
  });
});

describe("POST /createPost", () => {
  test("createPost", async () => {
    const postService = new PostService(new MockClient());
    const payload = {} as IPost;
    payload.id = 101;
    payload.userId = 2;
    payload.title = "This is new title";
    payload.body = "This is the body";

    return await postService.createPost(payload).then(async (data) => {
      expect(data).toEqual(payload);
    });
  });
});

describe("PUT /editPost", () => {
  test("createPost", async () => {
    const postService = new PostService(new MockClient());
    const payload = {
      id: 1,
      userId: 1,
      title: "This is edit title",
      body: "This is edit body",
    };
    return await postService.editPost(payload).then(async (data) => {
      expect(data).toEqual(payload);
    });
  });
});

describe("Delete /deletePost", () => {
  test("createPost", async () => {
    const postService = new PostService(new MockClient());
    return await postService.deletePost(1).then(async (data) => {
      expect(data).toEqual({});
    });
  });
});
