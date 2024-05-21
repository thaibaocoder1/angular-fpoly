import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { AdminUserComponent } from './admin-user.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';

@NgModule({
  declarations: [AdminUserComponent],
  imports: [CommonModule, AdminUserRoutingModule, AdminCommonModule],
})
export class AdminUserModule {}
