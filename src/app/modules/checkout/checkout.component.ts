import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  Observable,
  Subject,
  Subscription,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { IUsers } from '../../core/models/users';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Province,
  ProvinceService,
} from '../../core/services/province/province.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CartItem } from '../../core/models/cart';
import { IProducts } from '../../core/models/products';
import { ApiResCoupon, ICoupons } from '../../core/models/coupon';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UniqueCoupon } from '../cart/cart.validator';
import { ToastrService } from 'ngx-toastr';
import { IOrders } from '../../core/models/order';
import * as UserActions from '../../core/state/users/users.actions';
import * as ProductActions from '../../core/state/products/products.actions';
import * as OrderActions from '../../core/state/order/order.actions';
import * as OrderDetailActions from '../../core/state/details/details.actions';

import { NgxSpinnerService } from 'ngx-spinner';
import { IOrderDetails } from '../../core/models/detail';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterContentInit {
  private API_URL = environment.API_URL + 'coupons';
  user$: Observable<IUsers | null> | undefined;
  cart$: Observable<CartItem[]> | undefined;
  productList$: IProducts[] | undefined;
  province$: Province[] | undefined;
  couponList: ICoupons[] | undefined = [];
  shipCostPrice: number = 0;
  totalPrice: number = 0;

  sub: Subscription | undefined;
  subscription: Subscription | undefined;
  private destroy$ = new Subject<void>();

  formCheckout = this.fb.group({
    fullname: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
      ],
    ],
    note: [''],
    province: ['', [Validators.required]],
    payment: ['cod'],
  });
  formCoupon = this.fb.group({
    coupon: [
      '',
      [Validators.required],
      [this.unique.validate.bind(this.unique)],
    ],
  });
  formCouponSubject = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private addressService: ProvinceService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private unique: UniqueCoupon,
    private http: HttpClient,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.addressService
      .getAllProvinces()
      .pipe(take(1))
      .subscribe((data) => (this.province$ = data));
    this.getUser();
    this.getAllProduct();
    this.cart$ = this.cartService.getCart();
    this.subscription = combineLatest([
      this.store.pipe(select((state) => state.products.products)),
      this.cart$,
    ])
      .pipe(
        map(([products, cartItems]) => {
          return products
            .filter((product) =>
              cartItems.some(
                (item) => item.productId === product._id && item.isBuyNow
              )
            )
            .map((product) => {
              return {
                ...product,
                quantityBuy: cartItems.find(
                  (item) => item.productId === product._id
                )?.quantity,
              };
            });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((filteredProducts) => {
        this.productList$ = filteredProducts;
      });
    this.shipCostPrice = this.shipCost;
    this.totalPrice = this.total;
    this.formCouponSubject
      .pipe(
        tap(() => this.formCoupon.markAsDirty()),
        switchMap(() =>
          this.formCoupon.statusChanges.pipe(
            startWith(this.formCoupon.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.submitForm());
  }
  submitForm() {
    const value = this.formCoupon.value;
    if (value.coupon) {
      this.http
        .post<ApiResCoupon>(this.API_URL + '/check', {
          name: value.coupon,
        })
        .pipe(take(1))
        .subscribe((data) => {
          if (data && data.success) {
            this.toast.success('Apply coupon success', undefined, {
              progressBar: true,
              timeOut: 1000,
            });
            if (this.couponList && this.couponList.length <= 0) {
              this.couponList = [data.data];
            } else {
              this.couponList?.push(data.data);
            }
            this.shipCost = 1;
          }
        });
    }
    this.formCoupon.reset();
  }
  handleSubmitOrder() {
    const values = this.formCheckout.getRawValue() as unknown as IOrders;
    if (values) {
      values.status = 1;
      values.cancelCount = 0;
      values.total = this.totalPrice;
      this.store.dispatch(OrderActions.AddOrder({ values }));
      this.cart$ = this.cartService.getCart();
      combineLatest([
        this.store.pipe(select((state) => state.orders.order)),
        this.store.pipe(select((state) => state.users.user)),
        this.cart$,
        this.store.pipe(select((state) => state.products.products)),
      ])
        .pipe(
          tap(() => this.spinner.show()),
          filter(
            ([order, user, cart, products]) =>
              order !== null &&
              order !== undefined &&
              user !== null &&
              user !== undefined
          ),
          switchMap(([order, user, cart, products]) => {
            return of(cart).pipe(
              map((cartItems) => {
                cartItems.forEach((item) => {
                  const product = products.find(
                    (p) => p._id === item.productId
                  );
                  const orderDetail: Partial<IOrderDetails> = {
                    orderID: order?._id,
                    productID: item.productId,
                    userID: user?._id,
                    price:
                      (<number>product?.price -
                        (100 - (product?.discount as number))) /
                      100,
                    quantity: item.quantity,
                  };
                  this.store.dispatch(
                    OrderDetailActions.AddOrderDetail({
                      values: orderDetail,
                    })
                  );
                });

                return cartItems;
              }),
              tap(() => this.spinner.hide())
            );
          }),
          take(1)
        )
        .subscribe((cartItems) => {
          if (cartItems) {
            this.toast.success('Order success', undefined, {
              progressBar: true,
              timeOut: 2000,
            });
          }
        });
    }
  }
  ngAfterContentInit(): void {
    this.store
      .pipe(
        select((state) => state.users.user),
        take(1)
      )
      .subscribe((data) => {
        this.formCheckout.patchValue({
          email: data?.email,
          fullname: data?.fullname,
          phone: data?.phone,
        });
        this.cdr.detectChanges();
      });
  }
  get subTotal() {
    if (this.productList$) {
      return this.productList$?.reduce((total, item) => {
        const price = (item.price * (100 - item.discount)) / 100;
        return total + <number>item?.quantityBuy * price;
      }, 0);
    }
    return 0;
  }
  get shipCost() {
    if (this.productList$ && this.productList$.length > 0) {
      return 5000 * this.productList$.length;
    }
    return 0;
  }
  set shipCost(value: number) {
    let percent: number = 0;
    let totalPercent: number = 0;
    let totalShipCost: number = 0;
    if (this.productList$ && this.productList$.length > 0) {
      totalShipCost = 5000 * this.productList$.length;
    }
    if (value >= 0 && this.couponList && this.couponList.length > 0) {
      this.couponList.forEach((item) => {
        percent += item.value;
        totalPercent = (100 - percent) / 100;
        totalShipCost = totalShipCost * totalPercent;
      });
    }
    this.shipCostPrice = totalShipCost;
    this.total = totalShipCost;
  }
  removeCoupon(id: string) {
    if (!this.couponList || this.couponList.length <= 0) return;
    const coupons = this.couponList.filter((item) => item._id !== id);
    this.couponList = coupons;
    this.shipCost = 1;
  }
  get total() {
    return this.subTotal - this.shipCost;
  }
  set total(ship: number) {
    if (ship > 0) {
      this.totalPrice = this.subTotal - ship;
    }
  }
  getUser() {
    this.sub = this.store
      .pipe(select((state) => state.users.auth))
      .subscribe((auth) => {
        if (auth?.success) {
          const { data } = auth;
          if ('accessToken' in data) {
            this.store.dispatch(
              UserActions.GetUser({ userId: data?.id as string })
            );
          }
        }
      });
  }
  getAllProduct() {
    this.store.dispatch(ProductActions.loadProduct());
  }
  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
