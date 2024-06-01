import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PermissionComponent } from './permission/permission.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ActiveComponent } from './active/active.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'active/:id',
    component: ActiveComponent,
  },
  {
    path: 'permission',
    component: PermissionComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  {
    path: 'reset/:id',
    component: ResetComponent,
  },
  {
    path: 'recovery',
    component: RecoveryComponent,
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
