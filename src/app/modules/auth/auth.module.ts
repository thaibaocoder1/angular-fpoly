import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { PermissionComponent } from './permission/permission.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ActiveComponent } from './active/active.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PermissionComponent,
    ForbiddenComponent,
    ActiveComponent,
    ForgotComponent,
    ResetComponent,
    RecoveryComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
