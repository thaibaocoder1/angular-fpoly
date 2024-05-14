import { ICategory } from './core/models/category';
import { IProducts } from './core/models/products';

export interface AppState {
  readonly products: IProducts[];
  readonly catalogs: ICategory[];
}
