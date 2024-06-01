import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, filter, map, switchMap, take } from 'rxjs';
import { IProducts } from '../../core/models/products';
import { ICoupons } from '../../core/models/coupon';
import { IUsers } from '../../core/models/users';
import { IOrders } from '../../core/models/order';
import * as ProductActions from '../../core/state/products/products.actions';
import * as CouponActions from '../../core/state/coupon/coupon.actions';
import * as UserActions from '../../core/state/users/users.actions';
import * as OrderActions from '../../core/state/order/order.actions';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
  products$: Observable<IProducts[]> | undefined;
  coupons$: Observable<ICoupons[]> | undefined;
  users$: Observable<IUsers[]> | undefined;
  pendingOrder: number = 0;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.getData();
    this.products$ = this.store.select((state) => state.products.products);
    this.coupons$ = this.store.select((state) => state.coupons.coupons);
    this.users$ = this.store.select((state) => state.users.users);
    this.store
      .pipe(
        select((state) => state.orders.loading),
        filter((loading) => !loading),
        switchMap(() => this.store.select((state) => state.orders.orders)),
        take(1)
      )
      .subscribe((orders) => {
        if (orders) {
          this.pendingOrder = orders.filter((item) => item.status === 1).length;
        }
      });
  }
  getData() {
    this.store.dispatch(ProductActions.loadProduct());
    this.store.dispatch(CouponActions.GetCounpon());
    this.store.dispatch(UserActions.GetAllUser());
    this.store.dispatch(OrderActions.GetOrder());
  }
}
