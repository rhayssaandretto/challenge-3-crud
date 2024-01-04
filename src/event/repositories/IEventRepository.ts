export interface IEventRepository<T> {
  create(event: T): Promise<T>;
  findAll(): Promise<T[] | null>;
  findById(id: string): Promise<T | null>;
  deleteById(id: string): Promise<void>;
}
