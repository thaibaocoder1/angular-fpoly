import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CouponActions from './coupon.actions';
import { CouponService } from '../../services/coupon/coupon.service';

@Injectable()
export class CouponEffects {
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CouponActions.GetCounpon),
      mergeMap(() =>
        this.couponService.getAll().pipe(
          map((coupons) => CouponActions.GetCounponSuccess({ coupons })),
          catchError((error) => of(CouponActions.GetCounponFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private couponService: CouponService
  ) {}
}
