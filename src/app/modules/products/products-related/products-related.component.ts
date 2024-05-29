import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import * as ProductActions from '../../../core/state/products/products.actions';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-products-related',
  templateUrl: './products-related.component.html',
  styleUrl: './products-related.component.css',
})
export class ProductsRelatedComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() catalogID: string = '';
  products$: Observable<IProducts[] | null> | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  productSelected$: IProducts | undefined;

  constructor(
    private store: Store<AppState>,
    private toast: ToastrService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.products$ = this.store.pipe(
      select((state) => state.products.products),
      map((productsState) => {
        return productsState.slice(0, 4);
      })
    );
  }
  handleQuickViewProduct(productId: string) {
    if (this.modalElement) {
      this.modalElement.refID = productId;
    }
    this.products$
      ?.pipe(
        take(1),
        map((data) => data?.find((item) => item._id === productId))
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
  ngAfterViewInit(): void {
    this.modalElement?.confirm.subscribe((productId: string) => {
      this.addToCart(productId);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['catalogID'] && changes['catalogID']?.currentValue !== '') {
      this.catalogID = changes['catalogID']?.currentValue;
      this.store.dispatch(
        ProductActions.loadProductWithCatID({ catID: this.catalogID })
      );
    }
  }
}
