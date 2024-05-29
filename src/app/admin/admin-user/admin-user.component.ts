import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../app.state';
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
import { IUsers } from '../../core/models/users';
import * as UserActions from '../../core/state/users/users.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckEmail } from '../../modules/auth/validators/check-email';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css',
})
export class AdminUserComponent implements OnInit, OnDestroy {
  formUser = this.fb.group({
    fullname: ['', [Validators.required]],
    username: [
      '',
      [Validators.required, Validators.pattern(/^[a-z0-9]{6,32}$/i)],
    ],
    email: [
      '',
      [Validators.required, Validators.email],
      [this.unique.validate.bind(this.unique)],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
      ],
    ],
    role: ['', [Validators.required]],
    imageUrl: [null as any],
  });
  formUserEdit = this.fb.group({
    fullname: ['', [Validators.required]],
    username: [
      '',
      [Validators.required, Validators.pattern(/^[a-z0-9]{6,32}$/i)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
      ],
    ],
    role: ['', [Validators.required]],
    imageUrl: [null as any],
  });

  formUserSubject = new Subject<boolean>();
  formUserSubjectEdit = new Subject<boolean>();

  private unsubscribe = new Subject<void>();

  users$: Observable<IUsers[] | null> | undefined;
  user$: Observable<IUsers | null> | undefined;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private unique: CheckEmail,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
    this.users$ = this.store.select((state) => state.users.users);
    this.formUserSubject
      .pipe(
        tap(() => this.formUser.markAsDirty()),
        switchMap(() =>
          this.formUser.statusChanges.pipe(
            startWith(this.formUser.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.submitForm());
    this.formUserSubjectEdit
      .pipe(
        tap(() => this.formUserEdit.markAsDirty()),
        switchMap(() =>
          this.formUserEdit.statusChanges.pipe(
            startWith(this.formUserEdit.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.submitFormEdit());
  }
  onUploadImage(event: Event, isEdit: boolean = false) {
    const input = event.target as HTMLInputElement;
    const previewImage = this.getPreviewImageItem('imageUrl');
    const previewImageEdit = this.getPreviewImageItem('imageUrlEdit');
    if (!isEdit) {
      if (input.files && input.files[0] !== null) {
        const file = input.files[0];
        this.formUser.patchValue({
          imageUrl: file,
        });
        if (previewImage) {
          previewImage.src = URL.createObjectURL(file);
        }
      }
    } else {
      if (input.files && input.files[0] !== null) {
        const file = input.files[0];
        this.formUserEdit.patchValue({
          imageUrl: file,
        });
        if (previewImageEdit) {
          previewImageEdit.src = URL.createObjectURL(file);
        }
      }
    }
  }
  handleEditUser(id: string) {
    this.store.dispatch(UserActions.GetUser({ userId: id }));
    this.store
      .pipe(
        select((state) => state.users.loading),
        distinctUntilChanged(),
        tap(() => {
          this.spinner.show();
        }),
        filter((loading) => !loading),
        tap(() => {
          this.spinner.hide();
        }),
        switchMap(() => {
          return this.store.pipe(select((state) => state.users.user));
        }),
        take(1)
      )
      .subscribe((data) => {
        this.formUserEdit.patchValue({
          email: data?.email,
          fullname: data?.fullname,
          username: data?.username,
          phone: data?.phone,
          role: data?.role,
        });
        const previewImageEdit = this.getPreviewImageItem('imageUrlEdit');
        previewImageEdit &&
          (previewImageEdit.src = data?.imageUrl.fileName as string);
      });
  }
  getPreviewImageItem(selector: string) {
    return document.getElementById(selector) as HTMLImageElement;
  }
  submitForm() {
    const values = this.formUser.getRawValue() as IUsers;
    const previewImage = this.getPreviewImageItem('imageUrl');
    const uploadFile = document.getElementById('image') as HTMLInputElement;
    if (values) {
      this.store.dispatch(UserActions.AddUser({ user: values }));
      this.sideActions(previewImage, uploadFile, this.formUser);
    }
  }
  submitFormEdit() {
    const values = this.formUserEdit.getRawValue() as IUsers;
    this.store
      .pipe(
        select((state) => state.users.user),
        take(1)
      )
      .subscribe((data) => {
        if (data) {
          values._id = data._id;
          if (!values.imageUrl) {
            values.imageUrl = data?.imageUrl;
          }
        }
      });
    const previewImage = this.getPreviewImageItem('imageUrlEdit');
    const uploadFile = document.getElementById('imageEdit') as HTMLInputElement;
    if (values) {
      this.store.dispatch(UserActions.UpdateUser({ user: values }));
      this.sideActions(previewImage, uploadFile, this.formUserEdit);
    }
  }
  sideActions(
    previewImage: HTMLImageElement,
    uploadFile: HTMLInputElement,
    form: FormGroup
  ) {
    this.store
      .pipe(
        select((state) => state.users.loading),
        distinctUntilChanged(),
        tap((loading) => loading && this.spinner.show()),
        switchMap(() => {
          return this.store.pipe(select((state) => state.users.user));
        }),
        filter((user) => !!user),
        tap(() => this.spinner.hide()),
        take(1)
      )
      .subscribe(() => {
        this.toast.success('Action success!', undefined, {
          timeOut: 2000,
          progressBar: true,
        });
        form.reset();
        previewImage && (previewImage.src = 'https://placehold.co/350x350');
        uploadFile && (uploadFile.value = '');
        this.getAllUsers();
      });
  }
  getAllUsers() {
    this.store.dispatch(UserActions.GetAllUser());
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
