import { createAction, props } from '@ngrx/store';
import { ICoupons } from '../../models/coupon';

// [GET] All Order
export const GetCounpon = createAction('[COUPON] Get Coupon');
export const GetCounponSuccess = createAction(
  '[COUPON] Get Coupon Success',
  props<{ coupons: ICoupons[] }>()
);
export const GetCounponFailure = createAction(
  '[COUPON] Get Coupon Failure',
  props<{ error: string }>()
);
// [ADD] Order
export const AddCoupon = createAction(
  '[COUPON] Add Coupon',
  props<{ values: ICoupons }>()
);
export const AddCouponSuccess = createAction(
  '[COUPON] Add Coupon Success',
  props<{ coupon: ICoupons }>()
);
export const AddCouponFailure = createAction(
  '[COUPON] Add Coupon Failure',
  props<{ error: string }>()
);
