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
  combineLatest,
  filter,
  mergeMap,
  of,
  take,
  takeUntil,
} from 'rxjs';
import { IOrders } from '../../../core/models/order';
import { IOrderDetails } from '../../../core/models/detail';
import { IProducts } from '../../../core/models/products';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import * as OrderActions from '../../../core/state/order/order.actions';
import * as OrderDetailActions from '../../../core/state/details/details.actions';
import * as ProductActions from '../../../core/state/products/products.actions';

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
  private onDestroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, private toast: ToastrService) {}
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
    const unsubscribe$ = new Subject<void>();
    this.cancelOrderModal?.confirm.subscribe((id: string) => {
      if (id) {
        this.store.dispatch(
          OrderActions.UpdateOrder({ orderId: id, status: 4 })
        );
        this.store.dispatch(ProductActions.loadProduct());
        this.store.dispatch(OrderDetailActions.GetOneDetail({ orderId: id }));
        combineLatest([
          this.store.pipe(select((state) => state.details.details)),
          this.store.select((state) => state.products.products),
        ])
          .pipe(
            filter(
              ([details, products]) =>
                details !== null && details !== undefined && details.length > 0
            ),
            mergeMap(([orders, products]) => {
              if (orders && orders.length > 0) {
                const actions = orders.map((item) => {
                  const product = products.find((p) => {
                    if (this.isProduct(item.productID)) {
                      return p._id === item.productID._id;
                    }
                    return null;
                  });
                  const productChange: Partial<IProducts> = {
                    _id: product?._id,
                    quantity: <number>product?.quantity + item.quantity,
                  };
                  return [
                    ProductActions.updateProduct({
                      product: productChange as IProducts,
                    }),
                  ];
                });
                actions.flat().forEach((action) => this.store.dispatch(action));
              }
              return of(orders);
            }),
            takeUntil(unsubscribe$),
            take(1)
          )
          .subscribe((res) => {
            if (res) {
              this.toast.success('Action success', undefined, {
                timeOut: 1000,
                progressBar: true,
              });
              this.getOrderDetails();
            }
          });
      }
    });
    this.onDestroy$.pipe(take(1)).subscribe(() => unsubscribe$.next());
  }
  showTextButton(status: number) {
    let str = '';
    switch (status) {
      case 1:
        str = 'Pending';
        break;
      case 2:
        str = 'Shipping';
        break;
      case 3:
        str = 'Received';
        break;
      case 4:
        str = 'Canceled';
        break;
      default:
        str = 'Rejected';
        break;
    }
    return str;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
