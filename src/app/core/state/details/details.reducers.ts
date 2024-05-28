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
  on(OrderDetailActions.AddOrderDetail, (state, { values }) => {
    return { ...state, loading: true };
  }),
  on(OrderDetailActions.AddOrderDetailSuccess, (state, { order }) => {
    return { ...state, loading: false, error: '', order };
  }),
  on(OrderDetailActions.AddOrderDetailFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  })
);
