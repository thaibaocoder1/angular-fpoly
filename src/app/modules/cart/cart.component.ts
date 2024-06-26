import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CartItem } from '../../core/models/cart';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, Subscription, combineLatest, map, take } from 'rxjs';
import { IProducts } from '../../core/models/products';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import * as ProductActions from '../../core/state/products/products.actions';
import {
  IEmit,
  ModalDynamicComponent,
} from '../../shared/components/modal-dynamic/modal-dynamic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CurrencyPipe],
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
  cart$: Observable<CartItem[]> | undefined;
  products$: Observable<IProducts[]> | undefined;
  productsList$: IProducts[] | undefined;
  private subscription: Subscription | undefined;
  @ViewChildren('subTotal') subTotalItems: QueryList<ElementRef> | undefined;
  @ViewChild('modal', { static: true }) modal: ModalComponent | undefined;
  @ViewChild(ModalDynamicComponent) modalDynamic:
    | ModalDynamicComponent
    | undefined;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.cart$ = this.cartService.getCart();
    this.subscription = combineLatest([
      this.store.pipe(select((state) => state.products.products)),
      this.cart$,
    ])
      .pipe(
        map(([products, cartItems]) => {
          return products
            .filter((product) =>
              cartItems.some((item) => item.productId === product._id)
            )
            .map((product) => {
              return {
                ...product,
                quantityBuy: cartItems.find(
                  (item) => item.productId === product._id
                )?.quantity,
              };
            });
        })
      )
      .subscribe((filteredProducts) => {
        this.productsList$ = filteredProducts;
      });
  }
  get subTotal() {
    if (this.productsList$) {
      return this.productsList$?.reduce((total, item) => {
        const price = (item.price * (100 - item.discount)) / 100;
        return total + <number>item?.quantityBuy * price;
      }, 0);
    }
    return 0;
  }
  get shipCost() {
    if (this.productsList$ && this.productsList$.length > 0) {
      return 5000 * this.productsList$.length;
    }
    return 0;
  }
  get total() {
    return this.subTotal + this.shipCost;
  }
  changeSubtotal(item: IProducts, type: string) {
    switch (type) {
      case 'INCREMENT':
        this.cartService.incrementQuantity(item._id);
        break;
      case 'DECREMENT':
        const quantity = this.cartService.decrementQuantity(item._id);
        if (quantity < 1) {
          this.setDynamicProductId(item._id);
        } else {
          this.unset();
        }
        break;
      default:
        break;
    }
  }
  private removeItem(productId: string) {
    const result = this.cartService.removeToCart(productId);
    if (result) {
      this.toast.info('Remove success!', undefined, {
        progressBar: true,
        closeButton: true,
        timeOut: 1000,
      });
    }
  }
  setProductID(productId: string) {
    if (this.modal) {
      this.modal.refID = productId;
    }
  }
  setDynamicProductId(productId: string) {
    if (this.modalDynamic) {
      this.modalDynamic.productId = productId;
      this.modalDynamic?.show();
    }
  }
  unset() {
    if (this.modalDynamic) {
      this.modalDynamic.isShow = false;
    }
  }
  identify(index: number, item: IProducts) {
    return item._id;
  }
  getAllProduct() {
    this.store.dispatch(ProductActions.loadProduct());
  }
  onConfirm(value: IEmit) {
    if (value.flag) {
      this.cartService.incrementQuantity(value.id);
    } else {
      this.removeItem(value.id);
    }
  }
  handleModifyCart() {
    this.cart$?.pipe(take(1)).subscribe((data) => {
      for (let item of data) {
        !item.isBuyNow && (item.isBuyNow = true);
      }
      localStorage.setItem('carts', JSON.stringify(data));
    });
    this.router.navigateByUrl('/checkout');
  }
  ngAfterViewInit(): void {
    this.modal?.confirm.subscribe((productId: string) => {
      this.removeItem(productId);
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
