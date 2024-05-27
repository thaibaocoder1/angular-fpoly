import { createAction, props } from '@ngrx/store';
import { ICoupons } from '../../models/coupon';

// [GET] - Category
export const loadCoupon = createAction('[Coupon] Load Coupon');
export const loadCouponSuccess = createAction(
  '[Coupon] Load Coupon Success',
  props<{ catalogs: ICoupons[] }>()
);
export const loadCouponFailure = createAction(
  '[Coupon] Load Coupon Failure',
  props<{ error: string }>()
);
