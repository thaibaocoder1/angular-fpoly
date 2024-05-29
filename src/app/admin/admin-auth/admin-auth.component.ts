import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as UserActions from '../../core/state/users/users.actions';
import {
  Observable,
  Subject,
  Subscription,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { IUsers } from '../../core/models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrl: './admin-auth.component.css',
})
export class AdminAuthComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  formUserSubjectEdit = new Subject<boolean>();

  user$: Observable<IUsers | null> | undefined;
  private userId: string = '';

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
    imageUrl: [null as any],
  });

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select((state) => state.users.auth))
      .subscribe((auth) => {
        if (auth?.success) {
          const { data } = auth;
          if ('accessToken' in data) {
            this.store.dispatch(
              UserActions.GetUser({ userId: data?.id as string })
            );
            this.user$ = this.store.select((state) => state.users.user);
          }
        }
      });
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
  getInfoUser() {
    this.store
      .pipe(
        select((state) => state.users.user),
        take(1)
      )
      .subscribe((user) => {
        this.formUserEdit.patchValue({
          email: user?.email,
          fullname: user?.fullname,
          username: user?.username,
          phone: user?.phone,
        });
        const previewImageEdit = this.getPreviewImageItem('imageUrlEdit');
        previewImageEdit &&
          (previewImageEdit.src = user?.imageUrl.fileName as string);
      });
  }
  submitFormEdit() {
    const values = this.formUserEdit.getRawValue() as IUsers;
    this.store
      .pipe(
        select((state) => state.users.user),
        take(1)
      )
      .subscribe((user) => {
        this.userId = user?._id as string;
        values._id = user?._id as string;
        values.role = user?.role as string;
        if (!values.imageUrl) {
          values.imageUrl = user?.imageUrl!;
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
        this.store.dispatch(UserActions.GetUser({ userId: this.userId }));
      });
  }
  onUploadImage(event: Event, isEdit: boolean = false) {
    const input = event.target as HTMLInputElement;
    const previewImageEdit = this.getPreviewImageItem('imageUrlEdit');
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
  getPreviewImageItem(selector: string) {
    return document.getElementById(selector) as HTMLImageElement;
  }
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
