import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import * as ProductActions from '../../../core/state/products/products.actions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  products$: Observable<IProducts[]>;
  constructor(
    private store: Store<AppState>,
    private toast: ToastrService,
    private cartService: CartService
  ) {
    this.products$ = this.store.select((state) => state.products.products);
  }
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
  addToCart(id: string) {
    this.toast.success('Add to cart successfully!', 'Thank you', {
      closeButton: true,
      progressBar: true,
    });
    this.cartService.addToCart(id);
  }
}
