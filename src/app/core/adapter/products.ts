import { IProducts } from '../models/products';

// Định nghĩa interface cho state của products
export interface ProductsState {
  loading: boolean;
  product: IProducts | null;
  products: IProducts[];
  error?: string;
}
