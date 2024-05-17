import { ICategory } from './core/models/category';
import { ProductsState } from './core/adapter/products';
import { UsersState } from './core/adapter/users';

export interface AppState {
  readonly products: ProductsState;
  readonly catalogs: ICategory[];
  readonly users: UsersState;
}
