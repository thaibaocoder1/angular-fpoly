import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import * as ProductActions from '../../../core/state/products/products.actions';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css',
})
export class ProductsDetailComponent implements OnInit {
  selectedProduct$: Observable<IProducts | null> | undefined;
  id: string = '';
  catalogID: string = '';

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getById();
    this.selectedProduct$ = this.store.pipe(
      select((state) => state.products.product),
      map((state) => {
        if (state) {
          this.catalogID = state.categoryID;
        }
        return state;
      })
    );
  }
  getById() {
    this.activatedRoute.paramMap
      .pipe(map((params) => params.get('id')))
      .subscribe((id) => {
        this.id = id as string;
        this.store.dispatch(
          ProductActions.loadProductDetail({ productId: this.id })
        );
      });
  }
}
