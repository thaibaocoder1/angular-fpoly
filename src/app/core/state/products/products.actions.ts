import { createAction, props } from '@ngrx/store';
import { IProducts } from '../../models/products';

// [GET]
export const loadProduct = createAction('[Product] Load Products');
export const loadProductSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: IProducts[] }>()
);
export const loadProductFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);
// [GET] - With ID
export const loadProductDetail = createAction(
  '[Product] Load Product Detail',
  props<{ productId: string }>()
);
// [GET] - With Catlog ID
export const loadProductWithCatID = createAction(
  '[Product] Load Products Catalog',
  props<{ catID: string }>()
);
// [GET] - With Slug
export const loadProductWithSlug = createAction(
  '[Product] Load Products With Slug',
  props<{ slug: string }>()
);
export const loadProductWithSlugSuccess = createAction(
  '[Product] Load Products With Slug Success',
  props<{ products: IProducts[] }>()
);

// CRUD
export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: IProducts }>()
);
export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: IProducts }>()
);
export const addProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: any }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: IProducts }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: IProducts }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
);
export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ productId: number }>()
);
export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);

// [RESET]
export const resetProductState = createAction('[Product] Reset Product State');
