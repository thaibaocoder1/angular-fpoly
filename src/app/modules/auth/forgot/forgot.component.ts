import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormBuilder, Validators } from '@angular/forms';
import { UniqueEmail } from '../validators/unique-email';
import {
  Subject,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import * as UserActions from '../../../core/state/users/users.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent implements OnInit {
  formSubmit$ = new Subject<boolean>();
  formRestore = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email],
      [this.unique.validate],
    ],
  });
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private unique: UniqueEmail,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        tap(() => this.formRestore.markAsDirty()),
        switchMap(() =>
          this.formRestore.statusChanges.pipe(
            startWith(this.formRestore.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe((validationSuccessful) => this.onSubmit());
  }
  onSubmit() {
    const values = this.formRestore.getRawValue();
    if (values) {
      this.store.dispatch(
        UserActions.ResetPassword({ email: values.email as string })
      );
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
            this.toast.info('Check email to confirm reset', undefined, {
              progressBar: true,
              timeOut: 1500,
            });
            setTimeout(() => {
              this.router.navigateByUrl('/auth/login');
            }, 1500);
          }
        });
    }
  }
}
