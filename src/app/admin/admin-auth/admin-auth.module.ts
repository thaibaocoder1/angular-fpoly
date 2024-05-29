import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdminAuthComponent],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    AdminCommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class AdminAuthModule {}
