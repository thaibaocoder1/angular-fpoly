import { Component, OnDestroy, OnInit } from '@angular/core';
import * as ProductActions from '../../core/state/products/products.actions';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { AppState } from '../../app.state';
import { IProducts } from '../../core/models/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../core/models/category';
import { UniqueCodeValidator } from '../validators/check-code';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SlugifyPipe } from '../../shared/pipes/slugify.pipe';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css',
})
export class AdminProductComponent implements OnInit, OnDestroy {
  products$: Observable<IProducts[]> | undefined;
  product$: Observable<IProducts[]> | undefined;
  catalogs$: Observable<ICategory[]> | undefined;
  page: number = 1;
  itemsPerPage: number = 4;
  private editProductId: string = '';
  formProduct = this.fb.group({
    name: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    categoryID: ['', Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    code: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^BAODEV(0[1-9]|[1-9][0-9])$/),
      ]),
      [this.uniqueCode.validate.bind(this.uniqueCode)],
    ],
    price: ['', Validators.compose([Validators.required])],
    discount: [''],
    content: ['', Validators.compose([Validators.required])],
    quantity: ['', Validators.compose([Validators.required])],
    thumb: [null as any],
  });
  formProductEdit = this.fb.group({
    name: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    categoryID: ['', Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    code: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^BAODEV(0[1-9]|[1-9][0-9])$/),
      ]),
    ],
    price: ['', Validators.compose([Validators.required])],
    discount: [''],
    content: ['', Validators.compose([Validators.required])],
    quantity: ['', Validators.compose([Validators.required])],
    thumb: [null as any],
  });
  formSubmitSubject$ = new Subject<boolean>();
  formSubmitSubjectEdit$ = new Subject<boolean>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private uniqueCode: UniqueCodeValidator,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private slug: SlugifyPipe
  ) {}
  ngOnInit() {
    this.getAll();
    this.products$ = this.store.select((state) => state.products.products);
    this.formSubmitSubject$
      .pipe(
        tap(() => this.formProduct.markAsDirty()),
        switchMap(() =>
          this.formProduct.statusChanges.pipe(
            startWith(this.formProduct.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.submitForm());
    this.formSubmitSubjectEdit$
      .pipe(
        tap(() => this.formProductEdit.markAsDirty()),
        switchMap(() =>
          this.formProductEdit.statusChanges.pipe(
            startWith(this.formProductEdit.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.submitFormEdit());
  }
  onImagePicked(event: Event, isEdit: boolean = false) {
    const input = event.target as HTMLInputElement;
    const previewImage = this.getImagePreview('imageUrl');
    const previewImageEdit = this.getImagePreview('imageUrlEdit');
    if (!isEdit) {
      if (input.files && input.files[0] !== null) {
        const file = input.files[0];
        this.formProduct.patchValue({
          thumb: file,
        });
        if (previewImage) {
          previewImage.src = URL.createObjectURL(file);
        }
      }
    } else {
      if (input.files && input.files[0] !== null) {
        const file = input.files[0];
        this.formProductEdit.patchValue({
          thumb: file,
        });
        if (previewImageEdit) {
          previewImageEdit.src = URL.createObjectURL(file);
        }
      }
    }
  }
  createProduct() {
    this.catalogs$ = this.store.select((state) => state.catalogs.catalog);
  }
  editProduct(id: string) {
    this.editProductId = id;
    this.store.dispatch(ProductActions.loadProductDetail({ productId: id }));
    this.catalogs$ = this.store.select((state) => state.catalogs.catalog);
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select((state) => state.products.product),
        take(1)
      )
      .subscribe((data) => {
        this.formProductEdit.patchValue({
          content: data?.content,
          description: data?.description,
          price: data?.price as unknown as string,
          quantity: data?.quantity as unknown as string,
          discount: data?.discount as unknown as string,
          code: data?.code as unknown as string,
          categoryID: data?.categoryID,
          name: data?.name,
        });
        const previewImage = this.getImagePreview('imageUrlEdit');
        previewImage && (previewImage.src = data?.thumb.fileName as string);
      });
  }
  submitForm() {
    const values = this.formProduct.getRawValue() as unknown as IProducts;
    const previewImage = this.getImagePreview('imageUrl');
    const uploadFile = document.getElementById('file') as HTMLInputElement;
    if (values) {
      this.store.dispatch(ProductActions.addProduct({ product: values }));
      this.sideActions(previewImage, uploadFile, this.formProduct);
    }
  }
  submitFormEdit() {
    const values = this.formProductEdit.getRawValue() as unknown as IProducts;
    values._id = this.editProductId;
    values.slug = this.slug.transform(values.name as string);
    this.store
      .pipe(
        select((state) => state.products.product),
        take(1)
      )
      .subscribe((data) => {
        if (!values.thumb && data) {
          values.thumb = data?.thumb;
        }
      });
    const previewImage = this.getImagePreview('imageUrlEdit');
    const uploadFile = document.getElementById('fileEdit') as HTMLInputElement;
    if (values) {
      this.store.dispatch(ProductActions.updateProduct({ product: values }));
      this.sideActions(previewImage, uploadFile, this.formProductEdit);
    }
  }
  sideActions(
    previewImage: HTMLImageElement,
    uploadFile: HTMLInputElement,
    form: FormGroup
  ) {
    this.store
      .pipe(
        select((state) => state.products.loading),
        distinctUntilChanged(),
        tap(() => this.spinner.show()),
        filter((loading) => !loading),
        tap(() => this.spinner.hide()),
        switchMap(() => {
          return this.store.pipe(select((state) => state.products.product));
        }),
        take(1)
      )
      .subscribe((data) => {
        if (data) {
          this.toast.success('Action success!', undefined, {
            timeOut: 2000,
            progressBar: true,
          });
          form.reset();
          previewImage && (previewImage.src = 'https://placehold.co/350x350');
          uploadFile && (uploadFile.value = '');
          this.getAll();
        }
      });
  }
  getImagePreview(selector: string) {
    const previewImage = document.getElementById(selector) as HTMLImageElement;
    return previewImage;
  }
  getAll() {
    this.store.dispatch(ProductActions.loadProduct());
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
