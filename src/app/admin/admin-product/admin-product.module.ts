import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductComponent } from './admin-product.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminProductComponent],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    AdminCommonModule,
    SharedModule,
  ],
})
export class AdminProductModule {}
