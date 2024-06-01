import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {
  Subject,
  tap,
  switchMap,
  startWith,
  filter,
  take,
  distinctUntilChanged,
} from 'rxjs';
import { AppState } from '../../../app.state';
import { UniqueEmail } from '../validators/unique-email';
import * as UserActions from '../../../core/state/users/users.actions';
import { EmailRecover } from '../validators/email-recover';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css',
})
export class RecoveryComponent {
  formSubmit$ = new Subject<boolean>();
  formRestore = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email],
      [this.recover.validate.bind(this.recover)],
    ],
  });
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private recover: EmailRecover,
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
        UserActions.RecoverAccount({ email: values.email as string })
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
          take(1)
        )
        .subscribe((res) => {
          if (res === false) {
            this.toast.info('Check email to confirm reset', undefined, {
              progressBar: true,
              timeOut: 1500,
            });
            setTimeout(() => {
              this.router.navigateByUrl('/auth/login');
            }, 1500);
            this.formRestore.reset();
          }
        });
    }
  }
}
