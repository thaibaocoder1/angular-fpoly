import { createAction, props } from '@ngrx/store';
import { IOrderDetails } from '../../models/detail';

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
