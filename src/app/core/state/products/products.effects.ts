import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProductActions from './products.actions';
import { ProductsService } from '../../services/products/products.service';

@Injectable()
export class ProductEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap(() =>
        this.productService.getAll().pipe(
          map((products) => ProductActions.loadProductSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error }))
          )
        )
      )
    )
  );
  loadProductSlug$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductWithSlug),
      mergeMap((payload) =>
        this.productService.getWithSlug(payload.slug).pipe(
          map((products) =>
            ProductActions.loadProductWithSlugSuccess({ products })
          ),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}
}
