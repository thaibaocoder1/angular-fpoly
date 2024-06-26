import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppState } from '../../app.state';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { IUsers } from '../../core/models/users';
import * as UserActions from '../../core/state/users/users.actions';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CheckEmail } from '../../modules/auth/validators/check-email';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css',
})
export class AdminUserComponent implements OnInit, OnDestroy, AfterViewInit {
  private alive = true;
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
  searchControl: FormControl = new FormControl();

  formUserSubject = new Subject<boolean>();
  formUserSubjectEdit = new Subject<boolean>();

  private unsubscribe = new Subject<void>();
  private subscription: Subscription | undefined;

  users$: Observable<IUsers[] | null> | undefined;
  user$: Observable<IUsers | null> | undefined;

  @ViewChild('unactiveModal', { static: true }) unactiveModal:
    | ModalComponent
    | undefined;

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
    this.subscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((query) => query.toLowerCase())
      )
      .subscribe((query) => {
        this.store.dispatch(UserActions.FilterData({ query }));
        this.users$ = this.store.select(
          (state) => state.users.filter as IUsers[]
        );
      });
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
  handleSoftDeleteUser(id: string) {
    if (id && this.unactiveModal) {
      this.unactiveModal.refID = id;
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
  ngAfterViewInit(): void {
    if (this.unactiveModal) {
      this.unactiveModal.confirm.subscribe((id: string) => {
        if (id) {
          this.store.dispatch(UserActions.DisabledUser({ id }));
          this.store
            .pipe(
              select((state) => state.users.loading),
              distinctUntilChanged(),
              pairwise(),
              tap(([prevLoading, currLoading]) => {
                if (currLoading) {
                  this.spinner.show();
                } else {
                  this.spinner.hide();
                }
              }),
              filter(
                ([prevLoading, currLoading]) => prevLoading && !currLoading
              ),
              takeWhile(() => this.alive)
            )
            .subscribe(() => {
              this.toast.success('Action success!', undefined, {
                progressBar: true,
                timeOut: 1000,
              });
              this.getAllUsers();
            });
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.alive = false;
    this.subscription && this.subscription.unsubscribe();
  }
}
