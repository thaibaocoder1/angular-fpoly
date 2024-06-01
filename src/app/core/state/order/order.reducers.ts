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
  on(OrderActions.GetOrder, (state) => {
    return { ...state, loading: true };
  }),
  on(OrderActions.GetOrderSuccess, (state, { orders }) => {
    return { ...state, loading: false, error: '', orders };
  }),
  on(OrderActions.GetOrderFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderActions.GetAllWithId, (state) => {
    return { ...state, loading: true };
  }),
  on(OrderActions.GetAllWithIdSuccess, (state, { orders }) => {
    return { ...state, loading: false, error: '', orders };
  }),
  on(OrderActions.GetAllWithIdFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderActions.GetOneOrder, (state) => {
    return { ...state, loading: true };
  }),
  on(OrderActions.GetOneOrderSuccess, (state, { order }) => {
    return { ...state, loading: false, error: '', order };
  }),
  on(OrderActions.GetOneOrderFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderActions.AddOrder, (state, { values }) => {
    return { ...state, loading: true };
  }),
  on(OrderActions.AddOrderSuccess, (state, { order }) => {
    return { ...state, loading: false, error: '', order };
  }),
  on(OrderActions.AddOrderFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderActions.UpdateOrder, (state, { orderId, status }) => {
    return { ...state, loading: true };
  }),
  on(OrderActions.UpdateOrderSuccess, (state, { order }) => {
    return { ...state, loading: false, error: '', order };
  }),
  on(OrderActions.UpdateOrderFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(OrderActions.PrintInvoice, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(OrderActions.PrintInvoiceSuccess, (state, { order }) => {
    return { ...state, loading: false, error: '', order };
  }),
  on(OrderActions.PrintInvoiceFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  })
);
