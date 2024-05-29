import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCouponRoutingModule } from './admin-coupon-routing.module';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminCouponRoutingModule,
    SharedModule,
    AdminCommonModule,
    ReactiveFormsModule,
  ],
})
export class AdminCouponModule {}
