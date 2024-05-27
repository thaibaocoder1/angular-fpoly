import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, Subscription, combineLatest, map, take } from 'rxjs';
import { IUsers } from '../../core/models/users';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Province,
  ProvinceService,
} from '../../core/services/province/province.service';
import { CartService } from '../../core/services/cart/cart.service';
import * as UserActions from '../../core/state/users/users.actions';
import * as ProductActions from '../../core/state/products/products.actions';
import { CartItem } from '../../core/models/cart';
import { IProducts } from '../../core/models/products';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterContentInit {
  user$: Observable<IUsers | null> | undefined;
  cart$: Observable<CartItem[]> | undefined;
  productList$: IProducts[] | undefined;
  province$: Province[] | undefined;

  sub: Subscription | undefined;
  subscription: Subscription | undefined;

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
    province: [''],
    payment: ['', [Validators.required]],
  });

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private addressService: ProvinceService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
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
        this.productList$ = filteredProducts;
      });
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
  get total() {
    return this.subTotal - this.shipCost;
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
  }
}
