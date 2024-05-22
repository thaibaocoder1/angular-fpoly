import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from '../validators/match.directive';
import { IUsers } from '../../../core/models/users';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as UserActions from '../../../core/state/users/users.actions';
import {
  Subject,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CheckEmail } from '../validators/check-email';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formSubmit$ = new Subject<boolean | null>();

  formReg = this.fb.group(
    {
      fullname: ['', [Validators.required]],
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-z]{6,32}$/i)],
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    { validators: matchPassword }
  );
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private unique: CheckEmail,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        tap(() => this.formReg.markAsDirty()),
        switchMap(() =>
          this.formReg.statusChanges.pipe(
            startWith(this.formReg.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.onSubmit());
  }
  onSubmit() {
    const values: Partial<IUsers> =
      this.formReg.getRawValue() as unknown as IUsers;
    this.store.dispatch(UserActions.RegUser({ user: values }));
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
        if (res) {
          this.router.navigateByUrl('/auth/login');
        }
      });
  }
}
