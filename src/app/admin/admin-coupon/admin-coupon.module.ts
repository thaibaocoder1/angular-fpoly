import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCouponRoutingModule } from './admin-coupon-routing.module';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AdminCouponComponent } from './admin-coupon.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdminCouponComponent],
  imports: [
    CommonModule,
    AdminCouponRoutingModule,
    AdminCommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class AdminCouponModule {}
