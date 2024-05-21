import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  number: number = 0;
  subscription: Subscription;
  constructor(private cartService: CartService) {
    this.subscription = this.cartService
      .getCartItemCount()
      .subscribe((number) => {
        this.number = number;
      });
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
