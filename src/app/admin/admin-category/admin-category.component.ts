import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../app.state';
import * as CategoryActions from '../../core/state/category/category.actions';
import { ICategory } from '../../core/models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SlugifyPipe } from '../../shared/pipes/slugify.pipe';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css',
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  cataglogs$: Observable<ICategory[]> | undefined;
  cataglog$: Observable<ICategory | null> | undefined;
  private unsubscribe$ = new Subject<void>();
  @ViewChild('editModal', { static: true }) editModal:
    | ModalComponent
    | undefined;

  formCatalog = this.fb.group({
    title: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });
  formCatalogV2 = this.fb.group({
    title: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toast: ToastrService,
    private slug: SlugifyPipe
  ) {}
  ngOnInit(): void {
    this.cataglogs$ = this.store.select((state) => state.catalogs.catalog);
    this.cataglog$ = this.store.select((state) => state.catalogs.detail);
  }
  editCategory(id: string) {
    this.getDetail(id);
  }
  getDetail(id: string) {
    this.store.dispatch(CategoryActions.loadCatalogDetail({ productId: id }));
    this.editModal && (this.editModal.refID = id);
    this.cataglog$?.pipe(takeUntil(this.unsubscribe$)).subscribe((item) => {
      this.formCatalogV2.patchValue({ title: item?.title });
    });
  }
  handleSubmit() {
    const values: Partial<ICategory> =
      this.formCatalog.getRawValue() as ICategory;
    if (values) {
      this.store.dispatch(CategoryActions.addCatalog({ value: values }));
      this.formCatalog.reset();
    }
    this.fetch();
  }
  handleSubmitEdit() {
    let values: Partial<ICategory> =
      this.formCatalogV2.getRawValue() as ICategory;
    values._id = this.editModal?.refID;
    values.slug = this.slug.transform(values.title as string);
    if (values) {
      this.store.dispatch(CategoryActions.updateCatalog({ value: values }));
    }
    this.formCatalogV2.reset();
    this.fetch();
  }
  fetch() {
    this.toast.success('Action success!', undefined, {
      timeOut: 2000,
      progressBar: true,
    });
    this.getAll();
  }
  getAll() {
    this.store.dispatch(CategoryActions.loadCatalog());
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
