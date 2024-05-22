import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IProducts } from '../../../core/models/products';
import { Observable, map } from 'rxjs';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-product-latest',
  templateUrl: './home-product-latest.component.html',
  styleUrl: './home-product-latest.component.css',
})
export class HomeProductLatestComponent implements OnInit, AfterViewInit {
  @Input() data!: Observable<IProducts[]>;
  product$: Observable<IProducts[]> | undefined;
  @ViewChildren('viewProduct') viewProducts: QueryList<ElementRef> | undefined;

  constructor(private cartService: CartService, private toast: ToastrService) {}
  ngOnInit() {
    if (this.data) {
      this.product$ = this.data.pipe(map((state) => state.slice(0, 8)));
    }
  }
  ngAfterViewInit(): void {
    console.log(this.viewProducts);
  }
  addToCart(id: string) {
    this.toast.success('Add to cart successfully!', 'Thank you', {
      closeButton: true,
      progressBar: true,
    });
    this.cartService.addToCart(id);
  }
}
