import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CouponActions from './coupon.actions';
import { CouponService } from '../../services/coupon/coupon.service';

@Injectable()
export class CouponEffects {
  getCoupon$ = createEffect(() =>
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
  getOneCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CouponActions.GetOneCounpon),
      mergeMap((payload) =>
        this.couponService.getOne(payload.id).pipe(
          map((coupon) => CouponActions.GetOneCounponSuccess({ coupon })),
          catchError((error) =>
            of(CouponActions.GetOneCounponFailure({ error }))
          )
        )
      )
    )
  );
  addCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CouponActions.AddCoupon),
      mergeMap(({ values }) =>
        this.couponService.addCoupon(values).pipe(
          map((coupon) => CouponActions.AddCouponSuccess({ coupon })),
          catchError((error) => of(CouponActions.AddCouponFailure({ error })))
        )
      )
    )
  );
  updateCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CouponActions.UpdateCoupon),
      mergeMap(({ values }) =>
        this.couponService.updateCoupon(values).pipe(
          map((coupon) => CouponActions.UpdateCouponSuccess({ coupon })),
          catchError((error) =>
            of(CouponActions.UpdateCouponFailure({ error }))
          )
        )
      )
    )
  );
  removeCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CouponActions.RemoveCoupon),
      mergeMap(({ id }) =>
        this.couponService.removeCoupon(id).pipe(
          map(() => CouponActions.RemoveCouponSuccess()),
          catchError((error) =>
            of(CouponActions.RemoveCouponFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private couponService: CouponService
  ) {}
}
