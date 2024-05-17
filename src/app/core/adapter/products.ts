import { IProducts } from '../models/products';

export interface ProductsState {
  loading: boolean;
  product: IProducts | null;
  products: IProducts[];
  error?: string;
}
