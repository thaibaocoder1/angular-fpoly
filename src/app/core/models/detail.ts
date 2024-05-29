import { IOrders } from './order';
import { IProducts } from './products';

export interface IOrderDetails {
  _id: string;
  productID: string | IProducts;
  orderID: string | IOrders;
  quantity: number;
  price: number;
  name?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
