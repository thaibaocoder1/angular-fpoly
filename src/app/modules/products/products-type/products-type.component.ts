import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { IProducts } from '../../../core/models/products';
import { AppState } from '../../../app.state';
import * as ProductActions from '../../../core/state/products/products.actions';
import { CartService } from '../../../core/services/cart/cart.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-products-type',
  templateUrl: './products-type.component.html',
  styleUrl: './products-type.component.css',
})
export class ProductsTypeComponent implements OnInit, AfterViewInit {
  page: number = 1;
  itemsPerPage: number = 6;
  products$: Observable<IProducts[]> | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  productSelected$: IProducts | undefined;

  constructor(
    private activated: ActivatedRoute,
    private store: Store<AppState>,
    private toast: ToastrService,
    private cartService: CartService
  ) {
    this.products$ = this.store.pipe(
      select((state) => state.products.products),
      map((products) => {
        if (products.length === 0) this.showError();
        return products;
      })
    );
  }
  ngOnInit(): void {
    this.activated.paramMap
      .pipe(map((params) => params.get('slug')))
      .subscribe((slug) => {
        this.store.dispatch(
          ProductActions.loadProductWithSlug({ slug: slug as string })
        );
      });
  }
  showError() {
    this.toast.error('Vui lòng thử lại', 'Sản phẩm đang phát triển!', {
      timeOut: 3000,
    });
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
  ngAfterViewInit(): void {
    this.modalElement?.confirm.subscribe((productId: string) => {
      this.addToCart(productId);
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
