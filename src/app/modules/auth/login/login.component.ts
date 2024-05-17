import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UniqueEmail } from '../validators/unique-email';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { distinctUntilChanged, filter, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as UserAction from '../../../core/state/users/users.actions';
interface IUser {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.unique.validate.bind(this.unique)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.min(6)],
    }),
  });
  constructor(
    private unique: UniqueEmail,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {}
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
          return this.store.pipe(select((state) => state.users.user));
        }),
        take(1)
      )
      .subscribe((res) => {
        if (res?.success) {
          localStorage.setItem('access_token', res.data?.accessToken as string);
          this.auth.currentUserSignal.set(res.data);
          this.router.navigateByUrl('/');
        }
      });

    // this.auth
    //   .login(values)
    //   .pipe(
    //     tap(() => {
    //       this.spinner.show();
    //     }),
    //     switchMap(() => {
    //       return this.auth.login(values);
    //     }),
    //     tap(() => {
    //       this.spinner.hide();
    //     })
    //   )
    //   .subscribe((res) => {
    //     if (res.success) {
    //       localStorage.setItem('access_token', res.data?.accessToken as string);
    //       this.auth.currentUserSignal.set(res.data);
    //       // this.router.navigateByUrl('/');
    //     }
    //   });
  }
}
