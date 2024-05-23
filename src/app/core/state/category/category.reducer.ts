import { createReducer, on } from '@ngrx/store';
import * as CatalogActions from './category.actions';
import { CategoryState } from '../../adapter/category';
import { ICategory } from '../../models/category';

export const initialState: CategoryState = {
  loading: false,
  data: null,
  catalog: [],
  detail: null,
  error: '',
};

export const CatalogReducer = createReducer(
  initialState,
  on(CatalogActions.loadCatalog, (state) => {
    return { ...state, loading: true };
  }),
  on(CatalogActions.loadCatalogSuccess, (state, { catalogs }) => {
    return { ...state, loading: false, catalog: catalogs, error: '' };
  }),
  on(CatalogActions.loadCatalogFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  }),
  on(CatalogActions.loadCatalogDetail, (state, { productId }) => {
    const detail = state.catalog.find(
      (item) => item._id === productId
    ) as ICategory;
    return { ...state, loading: false, detail };
  }),
  on(CatalogActions.addCatalog, (state) => {
    return { ...state, loading: true };
  }),
  on(CatalogActions.addCatalogSuccess, (state, { detail }) => {
    return { ...state, loading: false, detail, error: '' };
  }),
  on(CatalogActions.addCatalogFailure, (state, { error }) => {
    console.error(error);
    return { ...state, loading: false, error };
  })
);
