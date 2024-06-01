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
// [Update] Order
export const UpdateOrder = createAction(
  '[ORDER] Update Order',
  props<{ status: number; orderId: string }>()
);
export const UpdateOrderSuccess = createAction(
  '[ORDER] Update Order Success',
  props<{ order: IOrders }>()
);
export const UpdateOrderFailure = createAction(
  '[ORDER] Update Order Failure',
  props<{ error: string }>()
);
// [Invoice] Order
export const PrintInvoice = createAction(
  '[ORDER] Print Invoice Order',
  props<{ id: string }>()
);
export const PrintInvoiceSuccess = createAction(
  '[ORDER] Print Invoice Order Success',
  props<{ order: IOrders }>()
);
export const PrintInvoiceFailure = createAction(
  '[ORDER] Print Invoice Order Failure',
  props<{ error: string }>()
);
