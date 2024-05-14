import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../core/models/category';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as CatalogActions from '../../../core/state/category/category.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  catalogs$: Observable<ICategory[]>;
  constructor(private store: Store<AppState>) {
    this.catalogs$ = this.store.pipe(select('catalogs'));
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.store.dispatch(CatalogActions.loadCatalog());
  }
}
