import { createReducer, on } from '@ngrx/store';
import { ICategory } from '../../models/category';
import * as CatalogActions from './category.actions';

export const initialState: ICategory[] = [];

export const CatalogReducer = createReducer(
  initialState,
  on(CatalogActions.loadCatalog, (state) => state),
  on(CatalogActions.loadCatalogSuccess, (state, { catalogs }) => catalogs),
  on(CatalogActions.loadCatalogFailure, (state, { error }) => {
    console.error(error);
    return state;
  })
);
