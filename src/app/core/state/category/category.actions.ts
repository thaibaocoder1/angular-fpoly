import { createAction, props } from '@ngrx/store';
import { ICategory } from '../../models/category';

export const loadCatalog = createAction('[Catalog] Load Catalog');
export const loadCatalogSuccess = createAction(
  '[Catalog] Load Catalog Success',
  props<{ catalogs: ICategory[] }>()
);
export const loadCatalogFailure = createAction(
  '[Catalog] Load Catalog Failure',
  props<{ error: any }>()
);
