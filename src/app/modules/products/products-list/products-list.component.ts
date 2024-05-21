import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  @Input() data!: Observable<IProducts[]>;
  products$: Observable<IProducts[]> | undefined;
  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.products$ = this.data;
    }
  }
  addToCart(id: string) {
    this.toast.success('Add to cart successfully!', 'Thank you', {
      closeButton: true,
      progressBar: true,
    });
    this.cartService.addToCart(id);
  }
}
