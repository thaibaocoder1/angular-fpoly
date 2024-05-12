import { IProducts } from './core/models/products';

export interface AppState {
  readonly products: IProducts[];
}
