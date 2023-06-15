import { User } from './types';

export interface IUser extends User {
  send_message(message_id: number): void;
  add_resource(...resource_ids: number[]): void;
  resource_completed(...resource_ids: number[]): void;
}
