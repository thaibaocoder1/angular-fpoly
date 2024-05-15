import { ICategory } from './core/models/category';
import { ProductsState } from './core/adapter/products';

export interface AppState {
  readonly products: ProductsState;
  readonly catalogs: ICategory[];
}
