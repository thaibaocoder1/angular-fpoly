export interface ICoupons {
  _id: string;
  name: string;
  value: number;
  expireIns: number;
  createdAt: string;
  updatedAt: string;
}
export interface ApiResCoupon {
  success: boolean;
  message: string;
  data: any;
}
