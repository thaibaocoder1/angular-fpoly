import { Component, Input, ViewChild } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { IProducts } from '../../../core/models/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-home-product-arrived',
  templateUrl: './home-product-arrived.component.html',
  styleUrl: './home-product-arrived.component.css',
})
export class HomeProductArrivedComponent {
  @Input() data!: Observable<IProducts[]>;
  products$: Observable<IProducts[]> | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  productSelected$: IProducts | undefined;

  constructor(private cartService: CartService, private toast: ToastrService) {}

  ngOnInit() {
    if (this.data) {
      this.products$ = this.data.pipe(map((state) => state.slice(8, 16)));
    }
  }
  handleQuickViewProduct(productId: string) {
    if (this.modalElement) {
      this.modalElement.productId = productId;
    }
    this.products$
      ?.pipe(
        take(1),
        map((data) => data.find((item) => item._id === productId))
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
}
