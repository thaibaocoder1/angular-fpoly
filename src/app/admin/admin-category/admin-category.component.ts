import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { IProducts } from '../../core/models/products';
import * as CategoryActions from '../../core/state/category/category.actions';
import { ICategory } from '../../core/models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css',
})
export class AdminCategoryComponent implements OnInit {
  cataglos$: Observable<ICategory[]>;
  formCatalog: FormGroup = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  constructor(private store: Store<AppState>) {
    this.cataglos$ = this.store.select((state) => state.catalogs);
  }
  ngOnInit(): void {}
}
