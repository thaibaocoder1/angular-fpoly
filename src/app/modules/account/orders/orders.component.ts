import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { IOrders } from '../../../core/models/order';
import * as OrderActions from '../../../core/state/order/order.actions';
import * as OrderDetailActions from '../../../core/state/details/details.actions';
import { IOrderDetails } from '../../../core/models/detail';
import { IProducts } from '../../../core/models/products';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit {
  orders$: Observable<IOrders[]> | undefined;
  order$: Observable<IOrders | null> | undefined;
  orderDetail$: IOrderDetails[] | undefined;
  total: number = 0;
  @ViewChild('cancelOrderModal', { static: true }) cancelOrderModal:
    | ModalComponent
    | undefined;

  orderID: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getOrderDetails();
    this.orders$ = this.store.select((state) => state.orders.orders);
  }
  handleViewOrder(id: string) {
    if (id) {
      this.orderID = id;
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
              this.total += item.quantity * item.price;
            }
          }
        });
    }
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
  isProduct(productID: string | IProducts): productID is IProducts {
    return typeof productID === 'object' && 'name' in productID;
  }
  handleCancelOrder(id: string) {
    if (id && this.cancelOrderModal) {
      this.cancelOrderModal.refID = id;
    }
  }
  ngAfterViewInit(): void {
    this.cancelOrderModal?.confirm.subscribe((id: string) => {
      if (id) {
        this.store.dispatch(
          OrderActions.UpdateOrder({ status: 4, orderId: id })
        );
        this.store
          .pipe(
            select((state) => state.orders.loading),
            distinctUntilChanged(),
            tap(() => {
              this.spinner.show();
            }),
            filter((loading) => !loading),
            tap(() => {
              this.spinner.hide();
            }),
            switchMap(() => {
              return this.store.pipe(select((state) => state.orders.order));
            }),
            take(1)
          )
          .subscribe((order) => {
            if (order) {
              this.toast.success('Action success', undefined, {
                timeOut: 1000,
                progressBar: true,
              });
              this.getOrderDetails();
            }
          });
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
