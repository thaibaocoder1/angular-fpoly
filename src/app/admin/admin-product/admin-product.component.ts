import { Component, OnInit } from '@angular/core';
import * as ProductActions from '../../core/state/products/products.actions';
import * as CatalogActions from '../../core/state/category/category.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { IProducts } from '../../core/models/products';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from '../../core/models/category';
import { UniqueCodeValidator } from '../validators/check-code';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css',
})
export class AdminProductComponent implements OnInit {
  products$: Observable<IProducts[]>;
  catalogs$: Observable<ICategory[]> | undefined;
  formProduct = this.fb.group({
    name: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    description: ['', Validators.compose([Validators.required])],
    code: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^BAODEV(0[1-9]|[1-9][0-9])$/),
      ]),
      [this.uniqueCode.validate.bind(this.uniqueCode)],
    ],
    price: ['', Validators.compose([Validators.required])],
    discount: [''],
    content: ['', Validators.compose([Validators.required])],
    quantity: ['', Validators.compose([Validators.required])],
    thumb: ['', Validators.compose([Validators.required])],
  });
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private uniqueCode: UniqueCodeValidator
  ) {
    this.products$ = this.store.select((state) => state.products.products);
  }
  ngOnInit() {
    this.getAll();
  }
  createProduct() {
    this.catalogs$ = this.store.select((state) => state.catalogs.catalog);
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
}
