import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import * as ProductActions from '../../../core/state/products/products.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-related',
  templateUrl: './products-related.component.html',
  styleUrl: './products-related.component.css',
})
export class ProductsRelatedComponent implements OnInit, OnChanges {
  @Input() catalogID: string = '';
  products$: Observable<IProducts[]>;
  id: string = '';
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.products$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        this.id = params.get('id') as string;
        return this.store.pipe(
          select('products'),
          map((products: IProducts[]) =>
            products.filter((product) => product._id !== this.id).slice(0, 4)
          )
        );
      })
    );
  }
  ngOnInit() {
    this.getAll();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
}
