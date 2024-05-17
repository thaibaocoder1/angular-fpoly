import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ProductReducer } from '../products/products.reducer';
import { CatalogReducer } from '../category/category.reducer';
import { UserReducer } from '../users/users.reducer';

export const reducers: ActionReducerMap<AppState> = {
  products: ProductReducer,
  catalogs: CatalogReducer,
  users: UserReducer,
};
