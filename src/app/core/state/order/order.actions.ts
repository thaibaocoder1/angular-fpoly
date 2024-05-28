import { createAction, props } from '@ngrx/store';
import { IOrders } from '../../models/order';

// [GET] Order
export const GetOrder = createAction('[ORDER] Get Order');
export const GetOrderSuccess = createAction(
  '[ORDER] Get Order Success',
  props<{ orders: IOrders[] }>()
);
export const GetOrderFailure = createAction(
  '[ORDER] Get Order Failure',
  props<{ error: string }>()
);
// [GET] Order with account
export const GetAllWithId = createAction(
  '[DETAILS] Get Order Detail With Id',
  props<{ userId: string }>()
);
export const GetAllWithIdSuccess = createAction(
  '[DETAILS] Get Order Detail With Id Success',
  props<{ orders: IOrders[] }>()
);
export const GetAllWithIdFailure = createAction(
  '[DETAILS] Get Order Detail With Id Failure',
  props<{ error: string }>()
);
// [GET] One Order
export const GetOneOrder = createAction(
  '[ORDER] Get One Order',
  props<{ orderId: string }>()
);
export const GetOneOrderSuccess = createAction(
  '[ORDER] Get One Order Success',
  props<{ order: IOrders }>()
);
export const GetOneOrderFailure = createAction(
  '[ORDER] Get One Order Failure',
  props<{ error: string }>()
);
// [ADD] Order
export const AddOrder = createAction(
  '[ORDER] Add Order',
  props<{ values: IOrders }>()
);
export const AddOrderSuccess = createAction(
  '[ORDER] Add Order Success',
  props<{ order: IOrders }>()
);
export const AddOrderFailure = createAction(
  '[ORDER] Add Order Failure',
  props<{ error: string }>()
);
