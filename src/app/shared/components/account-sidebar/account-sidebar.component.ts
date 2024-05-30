import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';
import { AppState } from '../../../app.state';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../../core/state/users/users.actions';
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
import { IUsers } from '../../../core/models/users';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSidebarComponent implements OnInit, AfterViewInit {
  user$: Observable<IUsers | null> | undefined;
  subscription: Subscription | undefined;
  userId: string | undefined;
  role: string = '';
  @ViewChild('logoutModal', { static: true }) logoutModal:
    | ModalComponent
    | undefined;
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
    role: [''],
    imageUrl: [null as any],
  });
  formUserSubjectEdit = new Subject<boolean>();

  constructor(
    private userService: UsersService,
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.subscription = this.store
      .pipe(
        select((state) => state.users.auth),
        take(1)
      )
      .subscribe((auth) => {
        if (auth?.success) {
          const { data } = auth;
          if ('accessToken' in data) {
            this.userId = data.id;
            this.role = data.role;
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
  checkRole(role: string) {
    return role === 'Admin' ? false : true;
  }
  handleEditUser() {
    this.store.dispatch(UserActions.GetUser({ userId: this.userId as string }));
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
        this.store.dispatch(
          UserActions.GetUser({ userId: this.userId as string })
        );
      });
  }
  getPreviewImageItem(selector: string) {
    return document.getElementById(selector) as HTMLImageElement;
  }
  handleLogout() {
    this.userService.userSignals.set(null);
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/auth/login');
  }
  logout() {
    if (this.logoutModal) {
      this.logoutModal.refID = this.userId as string;
    }
  }
  ngAfterViewInit(): void {
    this.logoutModal?.confirm.subscribe((id: string) => {
      if (id) {
        this.store.dispatch(UserActions.LogoutUser({ userId: id as string }));
        this.handleLogout();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
