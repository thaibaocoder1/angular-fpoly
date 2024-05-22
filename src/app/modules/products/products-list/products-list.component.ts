import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import * as ProductActions from '../../../core/state/products/products.actions';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  products$: Observable<IProducts[]>;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  productSelected$: IProducts | undefined;

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
  handleQuickViewProduct(productId: string) {
    if (this.modalElement) {
      this.modalElement.productId = productId;
    }
    this.products$
      ?.pipe(
        take(1),
        map((data) => data.find((item) => item._id === productId))
      )
      .subscribe((product) => {
        this.productSelected$ = product;
      });
  }
  addToCart(id: string) {
    this.toast.success('Add to cart successfully!', 'Thank you', {
      closeButton: true,
      progressBar: true,
      timeOut: 2000,
    });
    this.cartService.addToCart(id);
  }
}
