import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProducts } from '../../../core/models/products';
import { AppState } from '../../../app.state';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home-product-latest',
  templateUrl: './home-product-latest.component.html',
  styleUrl: './home-product-latest.component.css',
})
export class HomeProductLatestComponent implements OnInit {
  @Input() data!: Observable<IProducts[]>;
  product$: Observable<IProducts[]> | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    if (this.data) {
      this.product$ = this.data.pipe(map((state) => state.slice(0, 8)));
    }
  }
}
