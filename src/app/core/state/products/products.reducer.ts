import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';
import { ProductsState } from '../../adapter/products';

export const initialState: ProductsState = {
  loading: false,
  product: null,
  products: [],
  filter: [],
  error: '',
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
    error: '',
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
    return {
      ...state,
      loading: false,
      product: selectedProduct || null,
      error: '',
    };
  }),
  on(ProductActions.loadProductWithCatID, (state, { catID }) => {
    const related = state.products.filter((item) => item.categoryID === catID);
    return { ...state, loading: false, products: related, error: '' };
  }),
  on(ProductActions.loadProductWithSlug, (state, { slug }) => {
    return state;
  }),
  on(ProductActions.loadProductWithSlugSuccess, (state, { products }) => {
    return { ...state, products: products, error: '' };
  }),
  on(ProductActions.addProduct, (state, { product }) => {
    return { ...state, loading: true };
  }),
  on(ProductActions.addProductSuccess, (state, { product }) => {
    return { ...state, loading: false, product, error: '' };
  }),
  on(ProductActions.addProductFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(ProductActions.updateProduct, (state, { product }) => {
    return { ...state, loading: true };
  }),
  on(ProductActions.updateProductSuccess, (state, { product }) => {
    return { ...state, loading: false, product, error: '' };
  }),
  on(ProductActions.updateProductFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(ProductActions.filterProduct, (state, { query, price }) => {
    const priceOriginal: number = price ? price : 0;
    console.log('🚀 ~ on ~ priceOriginal:', priceOriginal);
    const filterProduct = [...state.products].filter((item) => {
      console.log(item.price.toString());
      return (
        item.name.toLowerCase().includes(query!) &&
        item.price.toString() <= priceOriginal.toString()
      );
    });
    console.log(filterProduct);
    return { ...state, loading: false, filter: filterProduct };
  }),
  on(ProductActions.filterProductFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  })
);
