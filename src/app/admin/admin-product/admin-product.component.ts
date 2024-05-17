import { Component, OnInit } from '@angular/core';
import * as ProductActions from '../../core/state/products/products.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { IProducts } from '../../core/models/products';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css',
})
export class AdminProductComponent implements OnInit {
  products$: Observable<IProducts[]>;
  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select((state) => state.products.products);
  }
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
}
