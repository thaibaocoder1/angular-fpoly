import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import * as ProductActions from '../../../core/state/products/products.actions';

@Component({
  selector: 'app-home-product-arrived',
  templateUrl: './home-product-arrived.component.html',
  styleUrl: './home-product-arrived.component.css',
})
export class HomeProductArrivedComponent {
  products$: Observable<IProducts[]>;
  constructor(private store: Store<AppState>) {
    this.products$ = this.store.pipe(
      select('products'),
      map((productsState) => productsState.slice(8, 16))
    );
  }
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
}
