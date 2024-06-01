import { ICoupons } from '../models/coupon';

export interface CouponState {
  loading: boolean;
  coupon: ICoupons | null;
  coupons: ICoupons[];
  filter?: ICoupons[];
  error?: string;
}
export interface ApiResponseCoupon {
  success: boolean;
  message: string;
  data: ICoupons;
}
