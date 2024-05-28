import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as OrderDetailActions from './details.actions';
import { DetailService } from '../../services/detail/detail.service';

@Injectable()
export class OrderdetailEffects {
  addOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailActions.AddOrderDetail),
      mergeMap((payload) =>
        this.orderDetailService.addOrderDetail(payload.values).pipe(
          map((order) => OrderDetailActions.AddOrderDetailSuccess({ order })),
          catchError((error) =>
            of(OrderDetailActions.AddOrderDetailFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private orderDetailService: DetailService
  ) {}
}
