import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  Observable,
  Subject,
  combineLatest,
  distinctUntilChanged,
  filter,
  mergeMap,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { IOrders } from '../../core/models/order';
import { IOrderDetails } from '../../core/models/detail';
import { IProducts } from '../../core/models/products';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as OrderActions from '../../core/state/order/order.actions';
import * as OrderDetailActions from '../../core/state/details/details.actions';
import * as ProductActions from '../../core/state/products/products.actions';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css',
})
export class AdminOrderComponent implements OnInit, OnDestroy {
  orders$: Observable<IOrders[]> | undefined;
  order$: Observable<IOrders | null> | undefined;
  details$: Observable<IOrderDetails[] | null> | undefined;
  orderDetail$: IOrderDetails[] | undefined;
  product: IProducts | undefined;
  products: IProducts[] | undefined;
  total: number = 0;
  statusList: Array<string> = [
    'Chờ xác nhận',
    'Đã xác nhận + vận chuyển',
    'Đã giao hàng',
    'Đã huỷ',
    'Từ chối nhận hàng',
  ];
  private destroy$ = new Subject<void>();
  private onDestroy$ = new Subject<void>();

  private orderID: string = '';
  statusOrder: number = 1;

  formChangeStatus = this.fb.group({
    status: [1, [Validators.required]],
  });

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}
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
  isProduct(productID: string | IProducts): productID is IProducts {
    return typeof productID === 'object' && 'name' in productID;
  }
  handleUpdateOrder(status: number, orderId: string) {
    this.orderID = orderId;
    this.statusOrder = status;
    this.formChangeStatus.patchValue({
      status,
    });
  }
  handleSubmitForm() {
    const values = this.formChangeStatus.getRawValue();
    const unsubscribe$ = new Subject<void>();
    if (values) {
      if (values.status == 4) {
        this.store.dispatch(
          OrderDetailActions.GetOneDetail({ orderId: this.orderID })
        );
        combineLatest([
          this.store.pipe(select((state) => state.details.details)),
          this.store.select((state) => state.products.products),
        ])
          .pipe(
            filter(
              ([details, products]) => details !== null && details !== undefined
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
            takeUntil(unsubscribe$)
          )
          .subscribe((res) => {
            console.log(res);
          });
      }
      this.store.dispatch(
        OrderActions.UpdateOrder({
          status: values.status as number,
          orderId: this.orderID,
        })
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
            this.getAllOrder();
          }
        });
      this.onDestroy$.pipe(take(1)).subscribe(() => unsubscribe$.next());
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  getAllOrder() {
    this.store.dispatch(OrderActions.GetOrder());
  }
}
