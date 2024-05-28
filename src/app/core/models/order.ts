export interface IOrders {
  _id: string;
  fullname: string;
  email: string;
  address: string;
  note: string;
  phone: string;
  payment: string;
  status: number;
  cancelCount?: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
