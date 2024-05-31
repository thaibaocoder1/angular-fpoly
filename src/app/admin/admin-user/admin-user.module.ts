import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { AdminUserComponent } from './admin-user.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminUserTrashComponent } from './admin-user-trash/admin-user-trash.component';

@NgModule({
  declarations: [AdminUserComponent, AdminUserTrashComponent],
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    AdminCommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class AdminUserModule {}
