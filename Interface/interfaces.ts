export interface IPost {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
export interface IPostRepository {
  getPosts(): Promise<Array<IPost>>;
  getPost(id: number): Promise<IPost>;
}

export interface IPostClient {
  index(): Promise<Array<IPost>>;
  show(id: number): Promise<IPost>;
  store(payload: IPost): Promise<IPost>;
  update(payload: IPost): Promise<IPost>;
  destroy(id: number): Promise<IPost>;
}

export interface IFormPost {
  title: string;
  body: string;
}
