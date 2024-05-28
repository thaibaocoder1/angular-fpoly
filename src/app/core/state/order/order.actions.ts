import { createAction, props } from '@ngrx/store';
import { IOrders } from '../../models/order';

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
