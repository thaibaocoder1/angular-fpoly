import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { AdminUserComponent } from './admin-user.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdminUserComponent],
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
