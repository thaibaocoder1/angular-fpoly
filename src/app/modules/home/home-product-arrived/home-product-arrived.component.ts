import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProducts } from '../../../core/models/products';

@Component({
  selector: 'app-home-product-arrived',
  templateUrl: './home-product-arrived.component.html',
  styleUrl: './home-product-arrived.component.css',
})
export class HomeProductArrivedComponent {
  @Input() data!: Observable<IProducts[]>;
  products$: Observable<IProducts[]> | undefined;
  constructor() {}
  ngOnInit() {
    if (this.data) {
      this.products$ = this.data.pipe(map((state) => state.slice(8, 16)));
    }
  }
}
