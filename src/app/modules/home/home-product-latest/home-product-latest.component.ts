import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IProducts } from '../../../core/models/products';
import * as ProductActions from '../../../core/state/products/products.actions';
import { AppState } from '../../../app.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-product-latest',
  templateUrl: './home-product-latest.component.html',
  styleUrl: './home-product-latest.component.css',
})
export class HomeProductLatestComponent implements OnInit {
  products$: Observable<IProducts[]>;
  constructor(private store: Store<AppState>) {
    this.products$ = this.store.pipe(
      select('products'),
      map((productsState) => productsState.slice(0, 8))
    );
  }
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
}
