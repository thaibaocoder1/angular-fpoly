import { createReducer, on } from '@ngrx/store';
import * as CouponActions from './coupon.actions';
import { CouponState } from '../../adapter/coupon';

export const initialState: CouponState = {
  loading: false,
  coupon: null,
  coupons: [],
  filter: [],
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
  }),
  on(CouponActions.GetOneCounpon, (state) => {
    return { ...state, loading: true };
  }),
  on(CouponActions.GetOneCounponSuccess, (state, { coupon }) => {
    return { ...state, loading: false, error: '', coupon };
  }),
  on(CouponActions.GetOneCounponFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(CouponActions.AddCoupon, (state) => {
    return { ...state, loading: true };
  }),
  on(CouponActions.AddCouponSuccess, (state, { coupon }) => {
    return { ...state, loading: false, error: '', coupon };
  }),
  on(CouponActions.AddCouponFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(CouponActions.UpdateCoupon, (state) => {
    return { ...state, loading: true };
  }),
  on(CouponActions.UpdateCouponSuccess, (state, { coupon }) => {
    return { ...state, loading: false, error: '', coupon };
  }),
  on(CouponActions.UpdateCouponFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(CouponActions.RemoveCoupon, (state) => {
    return { ...state, loading: true };
  }),
  on(CouponActions.RemoveCouponSuccess, (state) => {
    return { ...state, loading: false, error: '' };
  }),
  on(CouponActions.RemoveCouponFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(CouponActions.FilterData, (state, { query }) => {
    const deepClone = [...state.coupons];
    const dataFilterd = deepClone.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    return {
      ...state,
      loading: false,
      error: '',
      filter: dataFilterd.length ? dataFilterd : deepClone,
    };
  })
);
