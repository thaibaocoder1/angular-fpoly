import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UniqueEmail } from '../validators/unique-email';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Subject,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as UserAction from '../../../core/state/users/users.actions';
import { IUser } from '../../../core/adapter/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formSubmit$ = new Subject<boolean | null>();
  formLogin = this.fb.group({
    email: [
      '',
      Validators.compose([Validators.required, Validators.email]),
      this.unique.validate,
    ],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });
  constructor(
    private unique: UniqueEmail,
    private spinner: NgxSpinnerService,
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        tap(() => this.formLogin.markAsDirty()),
        switchMap(() =>
          this.formLogin.statusChanges.pipe(
            startWith(this.formLogin.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.onSubmit());
  }
  onSubmit() {
    const values = this.formLogin.getRawValue() as IUser;
    this.store.dispatch(UserAction.LoginUser({ user: values }));
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
          return this.store.pipe(select((state) => state.users.auth));
        }),
        take(1)
      )
      .subscribe((res) => {
        if (res?.success) {
          if ('data' in res) {
            const { data } = res;
            if ('accessToken' in data) {
              localStorage.setItem('access_token', data.accessToken as string);
              this.router.navigateByUrl('/');
            }
          }
        }
      });
  }
}
