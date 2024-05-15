import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { IProducts } from '../../../core/models/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  @Input() data!: Observable<IProducts[]>;
  products$: Observable<IProducts[]> | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    if (this.data) {
      this.products$ = this.data;
    }
  }
}
