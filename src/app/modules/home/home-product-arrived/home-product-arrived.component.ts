import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProducts } from '../../../core/models/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-product-arrived',
  templateUrl: './home-product-arrived.component.html',
  styleUrl: './home-product-arrived.component.css',
})
export class HomeProductArrivedComponent {
  @Input() data!: Observable<IProducts[]>;
  products$: Observable<IProducts[]> | undefined;
  constructor(private cartService: CartService, private toast: ToastrService) {}

  ngOnInit() {
    if (this.data) {
      this.products$ = this.data.pipe(map((state) => state.slice(8, 16)));
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
