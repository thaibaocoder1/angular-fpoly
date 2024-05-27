import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CartItem } from '../../core/models/cart';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  Observable,
  Subject,
  Subscription,
  combineLatest,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { IProducts } from '../../core/models/products';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import * as ProductActions from '../../core/state/products/products.actions';
import {
  IEmit,
  ModalDynamicComponent,
} from '../../shared/components/modal-dynamic/modal-dynamic.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UniqueCoupon } from './cart.validator';
import { ApiResCoupon, ICoupons } from '../../core/models/coupon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CurrencyPipe],
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
  private API_URL = environment.API_URL + 'coupons';
  cart$: Observable<CartItem[]> | undefined;
  products$: Observable<IProducts[]> | undefined;
  productsList$: IProducts[] | undefined;
  couponList: ICoupons[] | undefined;
  private subscription: Subscription | undefined;
  @ViewChildren('subTotal') subTotalItems: QueryList<ElementRef> | undefined;
  @ViewChild('modal', { static: true }) modal: ModalComponent | undefined;
  @ViewChild(ModalDynamicComponent) modalDynamic:
    | ModalDynamicComponent
    | undefined;
  formCoupon = this.fb.group({
    coupon: [
      '',
      [Validators.required],
      [this.unique.validate.bind(this.unique)],
    ],
  });
  formCouponSubject = new Subject<boolean>();
  constructor(
    private cartService: CartService,
    private store: Store<AppState>,
    private toast: ToastrService,
    private fb: FormBuilder,
    private unique: UniqueCoupon,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
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
              cartItems.some((item) => item.productId === product._id)
            )
            .map((product) => {
              return {
                ...product,
                quantityBuy: cartItems.find(
                  (item) => item.productId === product._id
                )?.quantity,
              };
            });
        })
      )
      .subscribe((filteredProducts) => {
        this.productsList$ = filteredProducts;
      });

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
  get subTotal() {
    if (this.productsList$) {
      return this.productsList$?.reduce((total, item) => {
        const price = (item.price * (100 - item.discount)) / 100;
        return total + <number>item?.quantityBuy * price;
      }, 0);
    }
    return 0;
  }
  get shipCost() {
    if (this.productsList$ && this.productsList$.length > 0) {
      return 5000 * this.productsList$.length;
    }
    return 0;
  }
  get total() {
    return this.subTotal - this.shipCost;
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
            console.log(456);
            if (this.couponList && this.couponList.length <= 0) {
              console.log('empty');
              this.couponList = [data.data];
            } else {
              console.log('push');
              this.couponList?.push(data.data);
            }
          }
          console.log(this.couponList);
        });
    }
    // if (this.couponList?.length === 0) {
    //   this.couponList = [value.coupon];
    // } else {
    // }
    // this.formCoupon.reset();
  }
  changeSubtotal(item: IProducts, type: string) {
    switch (type) {
      case 'INCREMENT':
        this.cartService.incrementQuantity(item._id);
        break;
      case 'DECREMENT':
        const quantity = this.cartService.decrementQuantity(item._id);
        if (quantity < 1) {
          this.setDynamicProductId(item._id);
        } else {
          this.unset();
        }
        break;
      default:
        break;
    }
  }
  private removeItem(productId: string) {
    const result = this.cartService.removeToCart(productId);
    if (result) {
      this.toast.info('Remove success!', undefined, {
        progressBar: true,
        closeButton: true,
        timeOut: 1000,
      });
    }
  }
  setProductID(productId: string) {
    if (this.modal) {
      this.modal.productId = productId;
    }
  }
  setDynamicProductId(productId: string) {
    if (this.modalDynamic) {
      this.modalDynamic.productId = productId;
      this.modalDynamic?.show();
    }
  }
  unset() {
    if (this.modalDynamic) {
      this.modalDynamic.isShow = false;
    }
  }
  identify(index: number, item: IProducts) {
    return item._id;
  }
  getAllProduct() {
    this.store.dispatch(ProductActions.loadProduct());
  }
  onConfirm(value: IEmit) {
    if (value.flag) {
      this.cartService.incrementQuantity(value.id);
    } else {
      this.removeItem(value.id);
    }
  }

  ngAfterViewInit(): void {
    this.modal?.confirm.subscribe((productId: string) => {
      this.removeItem(productId);
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
