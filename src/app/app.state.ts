import { ProductsState } from './core/adapter/products';
import { UsersState } from './core/adapter/users';
import { CategoryState } from './core/adapter/category';
import { OrderState } from './core/adapter/order';
import { CouponState } from './core/adapter/coupon';
import { OrderDetailState } from './core/adapter/details';

export interface AppState {
  readonly products: ProductsState;
  readonly catalogs: CategoryState;
  readonly users: UsersState;
  readonly orders: OrderState;
  readonly details: OrderDetailState;
  readonly coupons: CouponState;
}
