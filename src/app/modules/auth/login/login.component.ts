import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UniqueEmail } from '../validators/unique-email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private unique: UniqueEmail) {}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [this.unique.validate],
      ],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }
  onSubmit() {
    const values = this.formLogin.getRawValue();
  }
}
