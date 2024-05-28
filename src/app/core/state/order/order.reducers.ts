import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { OrderState } from '../../adapter/order';

export const initialState: OrderState = {
  loading: false,
  order: null,
  orders: [],
  error: '',
};

export const OrderReducer = createReducer(
  initialState,
  on(OrderActions.AddOrder, (state, { values }) => {
    return { ...state, loading: true };
  }),
  on(OrderActions.AddOrderSuccess, (state, { order }) => {
    return { ...state, loading: false, error: '', order };
  }),
  on(OrderActions.AddOrderFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  })
);
