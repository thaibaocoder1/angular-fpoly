import { createAction, props } from '@ngrx/store';
import { ICategory } from '../../models/category';

// [GET] - Category
export const loadCatalog = createAction('[Catalog] Load Catalog');
export const loadCatalogSuccess = createAction(
  '[Catalog] Load Catalog Success',
  props<{ catalogs: ICategory[] }>()
);
export const loadCatalogFailure = createAction(
  '[Catalog] Load Catalog Failure',
  props<{ error: string }>()
);
// [GET] - With ID
export const loadCatalogDetail = createAction(
  '[Catalog] Load Catalog Detail',
  props<{ productId: string }>()
);
// [ADD] - Category
export const addCatalog = createAction(
  '[Catalog] Add Catalog',
  props<{ value: Partial<ICategory> }>()
);
export const addCatalogSuccess = createAction(
  '[Catalog] Add Catalog Success',
  props<{ detail: ICategory }>()
);
export const addCatalogFailure = createAction(
  '[Catalog] Add Catalog Failure',
  props<{ error: string }>()
);
