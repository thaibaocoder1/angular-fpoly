import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UniqueEmail } from '../validators/unique-email';
import { matchPassword } from '../validators/match.directive';

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
      email: ['', [Validators.required, Validators.email]],
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
  constructor(private fb: FormBuilder, private unique: UniqueEmail) {}
  ngOnInit(): void {}
  onSubmit() {
    console.log(this.formReg.getRawValue());
  }
}
