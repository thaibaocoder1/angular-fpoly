import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  asyncScheduler,
  concat,
  debounceTime,
  map,
  of,
  scheduled,
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
export class ProductsListComponent implements OnInit, AfterViewInit {
  page: number = 1;
  itemsPerPage: number = 6;
  searchTerm: string = '';
  products$: Observable<IProducts[]> | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  productSelected$: IProducts | undefined;
  searchControl: FormControl = new FormControl();

  constructor(
    private store: Store<AppState>,
    private toast: ToastrService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.getAll();
    this.products$ = this.store.select((state) => state.products.products);
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => {
          this.searchTerm = value || '';
          if (!this.products$) {
            return of([]);
          }
          return this.products$.pipe(
            map((data) => {
              console.log('🚀 ~ ProductsListComponent ~ map ~ data:', data);
              if (this.searchTerm === '') {
                return data;
              }
              return data.filter((x) =>
                x.name.toLowerCase().includes(this.searchTerm.toLowerCase())
              );
            })
          );
        })
      )
      .subscribe((data) => {
        this.products$ = of(data);
      });
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
