import { IOrders } from '../models/order';

export interface OrderState {
  loading: boolean;
  order: IOrders | null;
  orders: IOrders[];
  error?: string;
}

export interface ApiResponseOrder {
  success: boolean;
  message: string;
  data: IOrders | IOrders[];
}
