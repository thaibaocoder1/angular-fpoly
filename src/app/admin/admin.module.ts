import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCommonComponent } from './admin-common/admin-common.component';
import { AdminProductComponent } from './admin-product/admin-product.component';

@NgModule({
  declarations: [AdminComponent, AdminHomeComponent, AdminCommonComponent, AdminProductComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
