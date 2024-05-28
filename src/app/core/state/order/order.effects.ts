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
  getOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.GetOrder),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => OrderActions.GetOrderSuccess({ orders })),
          catchError((error) => of(OrderActions.GetOrderFailure({ error })))
        )
      )
    )
  );
  getOrderWithId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.GetAllWithId),
      mergeMap((payload) =>
        this.orderService.getOrderWithId(payload.userId).pipe(
          map((orders) => OrderActions.GetAllWithIdSuccess({ orders })),
          catchError((error) => of(OrderActions.GetAllWithIdFailure({ error })))
        )
      )
    )
  );
  getOneOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.GetOneOrder),
      mergeMap((payload) =>
        this.orderService.getOneOrder(payload.orderId).pipe(
          map((order) => OrderActions.GetOneOrderSuccess({ order })),
          catchError((error) => of(OrderActions.GetOneOrderFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private orderService: OrderService) {}
}
