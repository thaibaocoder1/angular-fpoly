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
  of,
  switchMap,
  take,
} from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import * as ProductActions from '../../../core/state/products/products.actions';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit, OnDestroy, AfterViewInit {
  page: number = 1;
  itemsPerPage: number = 6;
  searchTerm: string = '';
  products$: Observable<IProducts[]> | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  @ViewChild('actionSort', { static: true }) actionSort:
    | ElementRef<any>
    | undefined;
  productSelected$: IProducts | undefined;
  searchControl: FormControl = new FormControl();
  private subscription: Subscription | undefined;

  constructor(
    private store: Store<AppState>,
    private toast: ToastrService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.getAll();
    this.products$ = this.store.select((state) => state.products.products);
    this.subscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((query) => query.toLowerCase())
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
    this.store.dispatch(ProductActions.filterProduct({ query: '', price }));
  }
  handleSortData() {
    if (this.actionSort) {
      const dropdownEl = this.actionSort.nativeElement;
      const tagLinkEl = dropdownEl.querySelectorAll(
        '.dropdown-item'
      ) as NodeListOf<HTMLButtonElement>;
      tagLinkEl.forEach((item) => {
        item.addEventListener('click', (e: Event) => {
          e.preventDefault();
          console.log(item.name);
        });
      });
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
