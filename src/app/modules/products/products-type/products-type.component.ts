import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { IProducts } from '../../../core/models/products';
import { AppState } from '../../../app.state';
import * as ProductActions from '../../../core/state/products/products.actions';

@Component({
  selector: 'app-products-type',
  templateUrl: './products-type.component.html',
  styleUrl: './products-type.component.css',
})
export class ProductsTypeComponent implements OnInit {
  products$: Observable<IProducts[]> | undefined;
  constructor(
    private activated: ActivatedRoute,
    private store: Store<AppState>,
    private toast: ToastrService
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
}
