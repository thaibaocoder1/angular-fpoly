import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import * as ProductActions from '../../../core/state/products/products.actions';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-products-related',
  templateUrl: './products-related.component.html',
  styleUrl: './products-related.component.css',
})
export class ProductsRelatedComponent implements OnInit, OnChanges {
  @Input() catalogID: string = '';
  products$: Observable<IProducts[] | null> | undefined;

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
  addToCart(id: string) {
    this.toast.success('Add to cart successfully!', 'Thank you', {
      closeButton: true,
      progressBar: true,
    });
    this.cartService.addToCart(id);
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
