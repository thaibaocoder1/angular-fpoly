import { ICategory } from './core/models/category';
import { IProducts } from './core/models/products';
import { IUsers } from './core/models/users';

export interface AppState {
  readonly products: IProducts[];
  readonly catalogs: ICategory[];
  // readonly users: IUsers[];
}
