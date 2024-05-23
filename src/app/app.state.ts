import { ProductsState } from './core/adapter/products';
import { UsersState } from './core/adapter/users';
import { CategoryState } from './core/adapter/category';

export interface AppState {
  readonly products: ProductsState;
  readonly catalogs: CategoryState;
  readonly users: UsersState;
}
