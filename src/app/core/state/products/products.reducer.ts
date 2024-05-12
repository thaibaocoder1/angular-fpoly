import { createReducer, on } from '@ngrx/store';
import { IProducts } from '../../models/products';
import * as ProductActions from './products.actions';

export const initialState: IProducts[] = [];

export const ProductReducer = createReducer(
  initialState,
  on(ProductActions.loadProduct, (state) => state),
  on(ProductActions.loadProductSuccess, (state, { products }) => products),
  on(ProductActions.loadProductFailure, (state, { error }) => {
    console.error(error);
    return state;
  })
);
