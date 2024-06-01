import { createReducer, on } from '@ngrx/store';
import * as OrderDetailActions from './details.actions';
import { OrderDetailState } from '../../adapter/details';

export const initialState: OrderDetailState = {
  loading: false,
  detail: null,
  details: [],
  error: '',
};

export const OrderDetailReducers = createReducer(
  initialState,
  on(OrderDetailActions.GetAllDetail, (state, {}) => {
    return { ...state, loading: true };
  }),
  on(OrderDetailActions.GetAllDetailSuccess, (state, { orders }) => {
    return { ...state, loading: false, error: '', details: orders };
  }),
  on(OrderDetailActions.GetAllDetailFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderDetailActions.GetOrderComplete, (state, {}) => {
    return { ...state, loading: true };
  }),
  on(OrderDetailActions.GetOrderCompleteSuccess, (state, { orders }) => {
    return { ...state, loading: false, error: '', details: orders };
  }),
  on(OrderDetailActions.GetOrderCompleteFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderDetailActions.GetOneDetail, (state) => {
    return { ...state, loading: true };
  }),
  on(OrderDetailActions.GetOneDetailSuccess, (state, { details }) => {
    return { ...state, loading: false, error: '', details };
  }),
  on(OrderDetailActions.GetOneDetailFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderDetailActions.AddOrderDetail, (state, { values }) => {
    return { ...state, loading: true };
  }),
  on(OrderDetailActions.AddOrderDetailSuccess, (state, { order }) => {
    return { ...state, loading: false, error: '', detail: order };
  }),
  on(OrderDetailActions.AddOrderDetailFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  })
);
