export interface IRepository<T> {
  create(user: T): Promise<T>;
  findByEmail(email: string): Promise<T | null>;
}
