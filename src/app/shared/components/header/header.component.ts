import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as ProductActions from '../../../core/state/products/products.actions';
import { IProducts } from '../../../core/models/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  number: number = 0;
  subscription: Subscription;
  searchControl = new FormControl();
  products$: Observable<IProducts[]> | undefined;
  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) {
    this.subscription = this.cartService
      .getCartItemCount()
      .subscribe((number) => {
        this.number = number;
      });
  }
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((query) => query.toLowerCase())
      )
      .subscribe((query) => {
        this.store.dispatch(ProductActions.filterProduct({ query }));
        this.products$ = this.store.select((state) => {
          return state.products.filter as IProducts[];
        });
      });
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
