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

@Component({
  selector: 'app-products-related',
  templateUrl: './products-related.component.html',
  styleUrl: './products-related.component.css',
})
export class ProductsRelatedComponent implements OnInit, OnChanges {
  @Input() catalogID: string = '';
  products$: Observable<IProducts[] | null> | undefined;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.products$ = this.store.pipe(
      select((state) => state.products.products),
      map((productsState) => {
        return productsState.slice(0, 4);
      })
    );
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
