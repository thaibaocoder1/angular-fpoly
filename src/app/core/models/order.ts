import { IUsers } from './users';

export interface IOrders {
  _id: string;
  userId: string | IUsers;
  fullname: string;
  email: string;
  address: string;
  note: string;
  phone: string;
  payment: string;
  status: number;
  total: number;
  province?: string;
  cancelCount?: number;
  createdAt: string;
  updatedAt: string;
}
