import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProducts } from '../../../core/models/products';
import { Observable, map, take } from 'rxjs';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-home-product-latest',
  templateUrl: './home-product-latest.component.html',
  styleUrl: './home-product-latest.component.css',
})
export class HomeProductLatestComponent implements OnInit, AfterViewInit {
  @Input() data!: Observable<IProducts[]>;
  product$: Observable<IProducts[]> | undefined;
  @ViewChild(ModalComponent, { static: true }) modalElement:
    | ModalComponent
    | undefined;
  productSelected$: IProducts | undefined;

  constructor(private cartService: CartService, private toast: ToastrService) {}
  ngOnInit() {
    if (this.data) {
      this.product$ = this.data.pipe(map((state) => state.slice(0, 8)));
    }
  }
  handleQuickViewProduct(productId: string) {
    if (this.modalElement) {
      this.modalElement.productId = productId;
    }
    this.product$
      ?.pipe(
        take(1),
        map((data) => data.find((item) => item._id === productId))
      )
      .subscribe((product) => {
        this.productSelected$ = product;
      });
  }
  ngAfterViewInit(): void {
    this.modalElement?.confirm.subscribe((productId: string) => {
      this.addToCart(productId);
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
