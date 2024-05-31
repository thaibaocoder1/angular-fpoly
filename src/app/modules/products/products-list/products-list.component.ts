import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  take,
} from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import * as ProductActions from '../../../core/state/products/products.actions';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit, OnDestroy, AfterViewInit {
  page: number = 1;
  itemsPerPage: number = 6;

  products$: Observable<IProducts[]> | undefined;
  productSelected$: IProducts | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  filterForm = this.fb.group({
    brands: this.fb.array([]),
  });
  searchControl: FormControl = new FormControl();

  queryString: string = '';
  filterPrice: number = 0;
  brands: Array<string> = ['Samsung', 'Sony', 'Asus', 'Iphone', 'Acer'];

  private subscription: Subscription | undefined;

  constructor(
    private store: Store<AppState>,
    private toast: ToastrService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  private addCheckboxes() {
    this.brands.forEach(() => this.brandFormArray.push(this.fb.control(false)));
  }

  get brandFormArray() {
    return this.filterForm.controls.brands as FormArray;
  }
  ngOnInit() {
    this.addCheckboxes();
    this.getAll();
    this.products$ = this.store.select((state) => state.products.products);
    this.subscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((query) => {
          this.queryString = query;
          return query.toLowerCase();
        })
      )
      .subscribe((query) => {
        this.store.dispatch(ProductActions.filterProduct({ query }));
        this.products$ = this.store.select(
          (state) => state.products.filter as IProducts[]
        );
      });
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
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
    this.subscription && this.subscription.unsubscribe();
  }
}
