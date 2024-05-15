import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UniqueEmail } from '../validators/unique-email';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private unique: UniqueEmail,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
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
    this.auth
      .login(values)
      .pipe(
        tap(() => {
          this.spinner.show();
        }),
        switchMap(() => {
          return this.auth.login(values);
        }),
        tap(() => {
          this.spinner.hide();
        })
      )
      .subscribe((res) => {
        if (res.success) {
          localStorage.setItem('token', res.data?.accessToken as string);
          this.auth.currentUserSignal.set(res.data);
          this.router.navigateByUrl('/');
        }
      });
  }
}
