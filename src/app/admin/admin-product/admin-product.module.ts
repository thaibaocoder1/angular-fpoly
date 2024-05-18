import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductComponent } from './admin-product.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';

@NgModule({
  declarations: [AdminProductComponent],
  imports: [CommonModule, AdminProductRoutingModule, AdminCommonModule],
})
export class AdminProductModule {}
