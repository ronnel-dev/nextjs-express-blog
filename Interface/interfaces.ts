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
