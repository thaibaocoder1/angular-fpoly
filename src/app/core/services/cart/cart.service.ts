import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >(this.loadCart());
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
    this.updateCartItemCount();
  }
  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }
  addToCart(productId: string) {
    const cart = this.cartSubject.getValue();
    const index = cart.findIndex((item) => item.productId === productId);

    if (index === -1) {
      cart.push({ productId, quantity: 1 });
    } else {
      cart[index].quantity += 1;
    }

    this.saveCart(cart);
    this.cartSubject.next(cart);
    this.updateCartItemCount();
  }
  incrementQuantity(productId: string): number {
    const cart = this.cartSubject.getValue();
    const index = cart.findIndex((item) => item.productId === productId);
    if (index !== -1) {
      cart[index].quantity += 1;
      this.saveCart(cart);
      this.cartSubject.next(cart);
      this.updateCartItemCount();
    }
    return cart[index].quantity;
  }

  decrementQuantity(productId: string): void {
    const cart = this.cartSubject.getValue();
    const index = cart.findIndex((item) => item.productId === productId);
    if (index !== -1 && cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      this.saveCart(cart);
      this.cartSubject.next(cart);
      this.updateCartItemCount();
    }
  }
  private saveCart(cart: CartItem[]): void {
    localStorage.setItem('carts', JSON.stringify(cart));
  }
  private loadCart(): CartItem[] {
    return JSON.parse(localStorage.getItem('carts') as string) ?? [];
  }
  private updateCartItemCount(): void {
    const cart = this.cartSubject.getValue();
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    this.cartItemCount.next(itemCount);
  }
}
