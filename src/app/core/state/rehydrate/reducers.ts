import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ProductReducer } from '../products/products.reducer';
import { CatalogReducer } from '../category/category.reducer';
import { UserReducer } from '../users/users.reducer';
import { OrderReducer } from '../order/order.reducers';
import { CouponReducer } from '../coupon/coupon.reducers';
import { OrderDetailReducers } from '../details/details.reducers';

export const reducers: ActionReducerMap<AppState> = {
  products: ProductReducer,
  catalogs: CatalogReducer,
  users: UserReducer,
  orders: OrderReducer,
  coupons: CouponReducer,
  details: OrderDetailReducers,
};
