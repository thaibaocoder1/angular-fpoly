import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as OrderActions from '../../../core/state/order/order.actions';
import { Observable, take } from 'rxjs';
import { IOrderDetails } from '../../../core/models/detail';
import { IOrders } from '../../../core/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders$: Observable<IOrders[]> | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.getOrderDetails();
    this.orders$ = this.store.select((state) => state.orders.orders);
  }
  getOrderDetails() {
    this.store
      .pipe(
        select((state) => state.users.user),
        take(1)
      )
      .subscribe((user) => {
        this.store.dispatch(
          OrderActions.GetAllWithId({ userId: user?._id as string })
        );
      });
  }
}
