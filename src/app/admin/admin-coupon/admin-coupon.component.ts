import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import { ICoupons } from '../../core/models/coupon';
import * as CouponActions from '../../core/state/coupon/coupon.actions';

@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrl: './admin-coupon.component.css',
})
export class AdminCouponComponent implements OnInit {
  coupons$: Observable<ICoupons[] | null> | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.getAll();
    this.coupons$ = this.store.select((state) => state.coupons.coupons);
  }
  getAll() {
    this.store.dispatch(CouponActions.GetCounpon());
  }
}
