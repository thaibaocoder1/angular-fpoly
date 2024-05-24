import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductComponent } from './admin-product.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminProductComponent],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    AdminCommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminProductModule {}
