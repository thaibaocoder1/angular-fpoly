import { createAction, props } from '@ngrx/store';
import { ICoupons } from '../../models/coupon';

// [GET] All Coupon
export const GetCounpon = createAction('[COUPON] Get Coupon');
export const GetCounponSuccess = createAction(
  '[COUPON] Get Coupon Success',
  props<{ coupons: ICoupons[] }>()
);
export const GetCounponFailure = createAction(
  '[COUPON] Get Coupon Failure',
  props<{ error: string }>()
);
// [GET] Coupon
export const GetOneCounpon = createAction(
  '[COUPON] Get One Coupon',
  props<{ id: string }>()
);
export const GetOneCounponSuccess = createAction(
  '[COUPON] Get One Coupon Success',
  props<{ coupon: ICoupons }>()
);
export const GetOneCounponFailure = createAction(
  '[COUPON] Get One Coupon Failure',
  props<{ error: string }>()
);
// [ADD] Coupon
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
// [UPDATE] Coupon
export const UpdateCoupon = createAction(
  '[COUPON] Update Coupon',
  props<{ values: ICoupons }>()
);
export const UpdateCouponSuccess = createAction(
  '[COUPON] Update Coupon Success',
  props<{ coupon: ICoupons }>()
);
export const UpdateCouponFailure = createAction(
  '[COUPON] Update Coupon Failure',
  props<{ error: string }>()
);
// [DELETE] Coupon
export const RemoveCoupon = createAction(
  '[COUPON] Remove Coupon',
  props<{ id: string }>()
);
export const RemoveCouponSuccess = createAction(
  '[COUPON] Remove Coupon Success'
);
export const RemoveCouponFailure = createAction(
  '[COUPON] Remove Coupon Failure',
  props<{ error: string }>()
);
// [FILTER] - Coupon
export const FilterData = createAction(
  '[COUPON] Filter Coupon',
  props<{ query: string }>()
);
