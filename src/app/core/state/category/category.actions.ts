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
export const loadCatalogDetailSuccess = createAction(
  '[Catalog] Load Catalog Detail Success',
  props<{ catalog: ICategory }>()
);
export const loadCatalogDetailFailure = createAction(
  '[Catalog] Load Catalog Detail Failure',
  props<{ error: string }>()
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
// [UPDATE] - Category
export const updateCatalog = createAction(
  '[Catalog] Update Catalog',
  props<{ value: Partial<ICategory> }>()
);
export const updateCatalogSuccess = createAction(
  '[Catalog] Update Catalog Success',
  props<{ detail: ICategory }>()
);
export const updateCatalogFailure = createAction(
  '[Catalog] Update Catalog Failure',
  props<{ error: string }>()
);
// [FILTER] - Category
export const FilterData = createAction(
  '[Catalog] Filter Catalog',
  props<{ query: string }>()
);
