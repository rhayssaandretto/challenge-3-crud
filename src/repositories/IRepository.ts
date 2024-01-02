export interface IRepository<T> {
  findByEmail(email: string): Promise<T | null>;
}
