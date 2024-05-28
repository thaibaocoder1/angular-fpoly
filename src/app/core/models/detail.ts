import { IOrders } from './order';
import { IProducts } from './products';
import { IUsers } from './users';

export interface IOrderDetails {
  _id: string;
  productID: string | IProducts;
  orderID: string | IOrders;
  userID: string | IUsers;
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}
