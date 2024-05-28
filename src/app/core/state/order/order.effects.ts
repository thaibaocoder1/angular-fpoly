import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as OrderActions from './order.actions';
import { OrderService } from '../../services/order/order.service';

@Injectable()
export class OrderEffects {
  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.AddOrder),
      mergeMap((payload) =>
        this.orderService.addOrder(payload.values).pipe(
          map((order) => OrderActions.AddOrderSuccess({ order })),
          catchError((error) => of(OrderActions.AddOrderFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private orderService: OrderService) {}
}
