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
  changeSubtotal(item: IProducts, index: number, type: string) {
    switch (type) {
      case 'INCREMENT':
        {
          const quantity = this.cartService.incrementQuantity(item._id);
          const price = (item.price * (100 - item.discount)) / 100;
          const subTotal = quantity * price;
          const subTotalElement = this.subTotalItems?.toArray()[index];
          if (subTotalElement) {
            const nativeElement = subTotalElement.nativeElement;
            if (nativeElement) {
              nativeElement.textContent = 'abc';
            }
          }
        }
        break;
      case 'DECREMENT':
        this.cartService.decrementQuantity(item._id);
        break;
      default:
        break;
    }
  }
  removeItem(item: IProducts, index: number) {}
  identify(index: number, item: IProducts) {
    return item._id;
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
