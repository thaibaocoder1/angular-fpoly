import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';
import { ProductsState } from '../../adapter/products';
import { IProducts } from '../../models/products';

export const initialState: ProductsState = {
  loading: false,
  product: null,
  products: [],
};

export const ProductReducer = createReducer(
  initialState,
  on(ProductActions.loadProduct, (state) => {
    return { ...state, loading: true };
  }),
  on(ProductActions.loadProductSuccess, (state, action) => ({
    ...state,
    loading: false,
    products: action.products,
  })),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProductActions.loadProductDetail, (state, action) => {
    const selectedProduct = state.products.find(
      (item) => item._id === action.productId
    );
    return { ...state, loading: false, product: selectedProduct || null };
  }),
  on(ProductActions.loadProductWithCatID, (state, { catID }) => {
    const related = state.products.filter((item) => item.categoryID === catID);
    return { ...state, loading: false, products: related };
  }),
  on(ProductActions.resetProductState, () => initialState)
);
