import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { IProducts } from '../../../core/models/products';
import { AppState } from '../../../app.state';
import * as ProductActions from '../../../core/state/products/products.actions';
import { CartService } from '../../../core/services/cart/cart.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-type',
  templateUrl: './products-type.component.html',
  styleUrl: './products-type.component.css',
})
export class ProductsTypeComponent implements OnInit, OnDestroy, AfterViewInit {
  page: number = 1;
  itemsPerPage: number = 6;
  products$: Observable<IProducts[]> | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  filterForm = this.fb.group({
    brands: this.fb.array([]),
  });
  productSelected$: IProducts | undefined;
  searchControl: FormControl = new FormControl();
  filterPrice: number = 0;
  queryString: string = '';
  brands: Array<string> = ['Samsung', 'Sony', 'Asus', 'Iphone', 'Acer'];
  subscription: Subscription | undefined;
  destroy$ = new Subject<void>();

  constructor(
    private activated: ActivatedRoute,
    private store: Store<AppState>,
    private toast: ToastrService,
    private cartService: CartService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}
  private addCheckboxes() {
    this.brands.forEach(() => this.brandFormArray.push(this.fb.control(false)));
  }

  get brandFormArray() {
    return this.filterForm.controls.brands as FormArray;
  }
  ngOnInit(): void {
    this.addCheckboxes();
    this.activated.paramMap
      .pipe(
        map((params) => params.get('slug')),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((slug) => {
        this.store.dispatch(
          ProductActions.loadProductWithSlug({ slug: slug as string })
        );
        this.cd.detectChanges();

        this.products$ = this.store.pipe(
          select((state) => state.products.products),
          distinctUntilChanged((prev, curr) => {
            return JSON.stringify(prev) === JSON.stringify(curr);
          }),
          map((products) => {
            if (products.length === 0) this.showError();
            return products;
          })
        );
      });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          this.queryString = query;
          this.store.dispatch(
            ProductActions.filterProduct({ query: query.toLowerCase() })
          );
          return this.store.pipe(
            select((state) => state.products.filter as IProducts[]),
            distinctUntilChanged(
              (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
            )
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((filteredProducts) => {
        this.products$ = of(filteredProducts);
      });
  }
  showError() {
    this.toast.error('Vui lòng thử lại', 'Sản phẩm đang phát triển!', {
      timeOut: 3000,
    });
  }
  handleQuickViewProduct(productId: string) {
    if (this.modalElement) {
      this.modalElement.refID = productId;
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
  handleFilterPrice(event: Event) {
    const target = event.target as HTMLInputElement;
    const price = target.value as unknown as number;
    this.filterPrice = price;
    this.store.dispatch(
      ProductActions.filterProduct({ query: this.queryString, price })
    );
    this.products$ = this.store.select(
      (state) => state.products.filter as IProducts[]
    );
  }
  handleFilter() {
    if (this.filterForm && this.filterForm.value.brands) {
      const selectedBrands = this.filterForm.value.brands
        .map((checked, index) => (checked ? this.brands[index] : null))
        .filter((value) => value !== null);
      if (selectedBrands) {
        this.store.dispatch(
          ProductActions.filterProduct({
            price: 0,
            query: this.queryString,
            brands: selectedBrands as string[],
          })
        );
        this.products$ = this.store.select(
          (state) => state.products.filter as IProducts[]
        );
      }
    }
  }
  handleSortData(event: Event, sortBy: string) {
    event.preventDefault();
    if (sortBy) {
      this.store.dispatch(ProductActions.SortProducts({ sortBy }));
    }
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
