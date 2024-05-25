import { Component, OnInit } from '@angular/core';
import * as ProductActions from '../../core/state/products/products.actions';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
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
  page: number = 1;
  itemsPerPage: number = 4;
  formProduct = this.fb.group({
    name: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    categoryID: ['', Validators.compose([Validators.required])],
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
    thumb: [''],
  });
  formSubmitSubject$ = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private uniqueCode: UniqueCodeValidator
  ) {
    this.products$ = this.store.select((state) => state.products.products);
  }
  ngOnInit() {
    this.getAll();
    this.formSubmitSubject$
      .pipe(
        tap(() => this.formProduct.markAsDirty()),
        switchMap(() =>
          this.formProduct.statusChanges.pipe(
            startWith(this.formProduct.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.submitForm());
  }
  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] !== null) {
      this.formProduct.patchValue({
        thumb: input.files[0].name,
      });
    }
  }
  submitForm() {
    const values = this.formProduct.getRawValue() as unknown as IProducts;
    if (values) {
      this.store.dispatch(ProductActions.addProduct({ product: values }));
    }
  }
  createProduct() {
    this.catalogs$ = this.store.select((state) => state.catalogs.catalog);
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
}
