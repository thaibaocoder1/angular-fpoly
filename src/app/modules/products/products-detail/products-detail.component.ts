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
  selectedProduct$: Observable<IProducts | undefined>;
  id: string = '';
  catalogID: string = '';

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.selectedProduct$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        this.id = params.get('id') as string;
        return this.store.pipe(
          select('products'),
          map((products: IProducts[]) => {
            const selectedProduct = products.find(
              (product) => product._id === this.id
            );
            if (selectedProduct) {
              this.catalogID = selectedProduct.categoryID;
            }
            return selectedProduct;
          })
        );
      })
    );
  }
  ngOnInit() {
    this.getById();
  }
  getById() {
    this.store.dispatch(ProductActions.loadProduct());
  }
}
