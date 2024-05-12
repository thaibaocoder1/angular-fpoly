import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TodoActions from './products.actions';
import { ProductsService } from '../../services/products/products.service';

@Injectable()
export class TodoEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadProduct),
      mergeMap(() =>
        this.productService.getAll().pipe(
          map((products) => TodoActions.loadProductSuccess({ products })),
          catchError((error) => of(TodoActions.loadProductFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}
}
