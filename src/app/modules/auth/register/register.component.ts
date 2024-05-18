import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from '../validators/match.directive';
import { CheckEmail } from '../validators/check-email';
import { IUsers } from '../../../core/models/users';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as UserActions from '../../../core/state/users/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
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
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    { validators: matchPassword }
  );
  constructor(
    private fb: FormBuilder,
    private unique: CheckEmail,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {}
  onSubmit() {
    const values: Partial<IUsers> =
      this.formReg.getRawValue() as unknown as IUsers;
    this.store.dispatch(UserActions.RegUser({ user: values }));
  }
}
