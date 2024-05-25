import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';

@NgModule({
  declarations: [AdminAuthComponent],
  imports: [CommonModule, AdminAuthRoutingModule, AdminCommonModule],
})
export class AdminAuthModule {}
