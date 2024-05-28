import { createReducer, on } from '@ngrx/store';
import * as CouponActions from './coupon.actions';
import { CouponState } from '../../adapter/coupon';

export const initialState: CouponState = {
  loading: false,
  coupon: null,
  coupons: [],
  error: '',
};

export const CouponReducer = createReducer(
  initialState,
  on(CouponActions.GetCounpon, (state) => {
    return { ...state, loading: true };
  }),
  on(CouponActions.GetCounponSuccess, (state, { coupons }) => {
    return { ...state, loading: false, error: '', coupons };
  }),
  on(CouponActions.GetCounponFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  })
);
