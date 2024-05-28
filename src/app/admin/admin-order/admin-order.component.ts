import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, Subject, filter, take, takeUntil } from 'rxjs';
import { IOrders } from '../../core/models/order';
import * as OrderActions from '../../core/state/order/order.actions';
import * as OrderDetailActions from '../../core/state/details/details.actions';
import { IOrderDetails } from '../../core/models/detail';
import { IProducts } from '../../core/models/products';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css',
})
export class AdminOrderComponent implements OnInit, OnDestroy {
  orders$: Observable<IOrders[]> | undefined;
  order$: Observable<IOrders | null> | undefined;
  orderDetail$: IOrderDetails[] | undefined;
  product: IProducts | undefined;
  total: number = 0;
  statusList: Array<string> = [
    'Chờ xác nhận',
    'Đã xác nhận + vận chuyển',
    'Đã giao hàng',
    'Đã huỷ',
    'Từ chối nhận hàng',
  ];
  private destroy$ = new Subject<void>();
  formChangeStatus = this.fb.group({
    status: [1, [Validators.required]],
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getAllOrder();
    this.orders$ = this.store.select((state) => state.orders.orders);
  }
  getStatusOrder(status: number) {
    let statusText: string = '';
    switch (status) {
      case 1:
        statusText = 'Chờ xác nhận';
        break;
      case 2:
        statusText = 'Đã xác nhận + vận chuyển';
        break;
      case 3:
        statusText = 'Đã nhận hàng';
        break;
      case 4:
        statusText = 'Đã huỷ';
        break;
      default:
        statusText = 'Từ chối nhận hàng';
        break;
    }
    return statusText;
  }
  handleViewOrder(id: string) {
    if (id) {
      this.store.dispatch(OrderActions.GetOneOrder({ orderId: id }));
      this.store.dispatch(OrderDetailActions.GetOneDetail({ orderId: id }));
      this.order$ = this.store.select((state) => state.orders.order);
      this.store
        .pipe(
          select((state) => state.details.details),
          filter((details) => !!details),
          takeUntil(this.destroy$)
        )
        .subscribe((data) => {
          if (data) {
            this.orderDetail$ = data;
            for (const item of data) {
              if (item.productID && typeof item.productID === 'object') {
                this.product = item.productID as IProducts;
              }
              this.total += item.quantity * item.price;
            }
          }
        });
    }
  }
  handleUpdateOrder(status: number) {
    this.formChangeStatus.patchValue({
      status: status,
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  getAllOrder() {
    this.store.dispatch(OrderActions.GetOrder());
  }
}
