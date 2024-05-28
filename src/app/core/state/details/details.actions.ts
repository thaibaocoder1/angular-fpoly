import { createAction, props } from '@ngrx/store';
import { IOrderDetails } from '../../models/detail';

// [GET] Order
export const GetAllDetail = createAction('[DETAILS] Get Order Detail');
export const GetAllDetailSuccess = createAction(
  '[DETAILS] Get Order Detail Success',
  props<{ orders: IOrderDetails[] }>()
);
export const GetAllDetailFailure = createAction(
  '[DETAILS] Get Order Detail Failure',
  props<{ error: string }>()
);
// [GET] One Order Detail
export const GetOneDetail = createAction(
  '[DETAILS] Get One Order Detail',
  props<{ orderId: string }>()
);
export const GetOneDetailSuccess = createAction(
  '[DETAILS] Get One Order Detail Success',
  props<{ details: IOrderDetails[] }>()
);
export const GetOneDetailFailure = createAction(
  '[DETAILS] Get One Order Detail Failure',
  props<{ error: string }>()
);
// [ADD] Order
export const AddOrderDetail = createAction(
  '[DETAILS] Add Order Detail',
  props<{ values: Partial<IOrderDetails> }>()
);
export const AddOrderDetailSuccess = createAction(
  '[DETAILS] Add Order Detail Success',
  props<{ order: IOrderDetails }>()
);
export const AddOrderDetailFailure = createAction(
  '[DETAILS] Add Order Detail Failure',
  props<{ error: string }>()
);
