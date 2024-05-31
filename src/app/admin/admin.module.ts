import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCommonModule } from './admin-common/admin-common.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent, AdminHomeComponent],
  imports: [CommonModule, AdminRoutingModule, AdminCommonModule, SharedModule],
})
export class AdminModule {}
