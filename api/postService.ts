import { IPost } from "../Interface/interfaces";
import { PostClient } from "./clients/postClient";

export class PostService {
  public constructor(private postClient: PostClient) {}

  public async getPosts(): Promise<Array<IPost>> {
    return this.postClient.index();
  }

  public async getPost(id: number): Promise<IPost> {
    return this.postClient.show(id);
  }

  public async createPost(payload: IPost): Promise<IPost> {
    return this.postClient.store(payload);
  }

  public async editPost(payload: IPost): Promise<IPost> {
    return this.postClient.update(payload);
  }

  public async deletePost(id: number): Promise<IPost> {
    return this.postClient.destroy(id);
  }
}
