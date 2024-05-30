import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from '../validators/match.directive';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { IUsers } from '../../../core/models/users';
import * as UserActions from '../../../core/state/users/users.actions';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  errorMessage$: Observable<string> | undefined;
  private userId: string = '';

  formReset = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    {
      validators: matchPassword,
    }
  );
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private activated: ActivatedRoute,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.activated.paramMap
      .pipe(
        map((params) => params.get('id')),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        id && (this.userId = id);
      });
  }
  ngOnInit(): void {
    this.store
      .pipe(
        select((state) => state.users.error),
        filter((message) => message !== ''),
        map((message) => {
          return message;
        }),
        take(1)
      )
      .subscribe((message) => {
        if (message) {
          this.toast.error(message, undefined, {
            progressBar: true,
            timeOut: 2000,
          });
        }
      });
  }
  handleSubmitForm() {
    const values = this.formReset.getRawValue() as IUsers;
    values._id = this.userId;
    if (values) {
      this.store.dispatch(UserActions.UpdatePassword({ values }));
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
        .subscribe((user) => {
          if (user) {
            this.router.navigateByUrl('/auth/login');
          }
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(UserActions.ResetState());
  }
}
