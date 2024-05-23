import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../app.state';
import { IProducts } from '../../core/models/products';
import * as CategoryActions from '../../core/state/category/category.actions';
import { ICategory } from '../../core/models/category';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css',
})
export class AdminCategoryComponent implements OnInit {
  cataglogs$: Observable<ICategory[]> | undefined;
  cataglog$: Observable<ICategory | null> | undefined;

  formCatalog = this.fb.group({
    title: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAll();
    this.cataglogs$ = this.store.select((state) => state.catalogs.catalog);
    this.cataglog$ = this.store.select((state) => state.catalogs.detail);
  }
  editCategory(id: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { edit: id },
      queryParamsHandling: 'merge',
    });
    this.store.dispatch(CategoryActions.loadCatalogDetail({ productId: id }));
  }
  handleSubmit() {
    const values: Partial<ICategory> =
      this.formCatalog.getRawValue() as ICategory;
    if (values) {
      this.store.dispatch(CategoryActions.addCatalog({ value: values }));
      this.getAll();
      this.toast.success('Add success', undefined, {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }
  getAll() {
    this.store.dispatch(CategoryActions.loadCatalog());
  }
}
