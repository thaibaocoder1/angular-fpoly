import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import * as ProductActions from '../../../core/state/products/products.actions';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css',
})
export class ProductsDetailComponent implements OnInit {
  selectedProduct$: Observable<IProducts | null> | undefined;
  id: string = '';
  catalogID: string = '';
  valueInput: number = 1;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private cartService: CartService,
    private router: Router
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
  addToCart(id: string, qty: number = 1) {
    this.toast.success('Add to cart successfully!', 'Thank you', {
      closeButton: true,
      progressBar: true,
      timeOut: 2000,
    });
    this.cartService.addToCart(id, qty);
    this.valueInput = 1;
  }
  handleBuyNow(productId: string, qty: number = 1) {
    this.toast.success('Wait to redirect checkout!', 'Thank you', {
      closeButton: true,
      progressBar: true,
      timeOut: 2000,
    });
    this.cartService.addToCart(productId, qty, true);
    this.valueInput = 1;
    setTimeout(() => {
      this.router.navigateByUrl('/checkout');
    }, 2000);
  }
  changeQuantity(type: string) {
    switch (type) {
      case 'INCREMENT':
        this.valueInput++;
        break;
      case 'DECREMENT':
        {
          const value = this.valueInput--;
          if (value < 2) {
            this.valueInput = 1;
          }
        }
        break;
      default:
        break;
    }
  }
}
