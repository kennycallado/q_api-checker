import { User } from './types';

export interface IUser extends User {
  add_resource(...resource_ids: number[]): void;
  resource_complete(...resource_ids: number[]): void;
}
