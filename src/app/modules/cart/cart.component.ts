import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CartItem } from '../../core/models/cart';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { IProducts } from '../../core/models/products';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CurrencyPipe],
})
export class CartComponent implements OnInit, OnDestroy {
  cart$: Observable<CartItem[]> | undefined;
  products$: Observable<IProducts[]> | undefined;
  productsList$: IProducts[] | undefined;
  private subscription: Subscription | undefined;
  @ViewChildren('subTotal') subTotalItems: QueryList<ElementRef> | undefined;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>,
    private currencyPipe: CurrencyPipe
  ) {}
  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
    this.subscription = combineLatest([
      this.store.pipe(select((state) => state.products.products)),
      this.cart$,
    ])
      .pipe(
        map(([products, cartItems]) =>
          products
            .filter((product) =>
              cartItems.some((item) => item.productId === product._id)
            )
            .map((product) => ({
              ...product,
              quantityBuy: cartItems.find(
                (item) => item.productId === product._id
              )?.quantity,
            }))
        )
      )
      .subscribe((filteredProducts) => {
        this.productsList$ = filteredProducts;
      });
  }
  changeSubtotal(id: string, type: string) {
    switch (type) {
      case 'INCREMENT':
        this.cartService.incrementQuantity(id);
        break;
      case 'DECREMENT':
        this.cartService.decrementQuantity(id);
        break;
      default:
        break;
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
