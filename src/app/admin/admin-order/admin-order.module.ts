import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrderRoutingModule } from './admin-order-routing.module';
import { AdminOrderComponent } from './admin-order.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdminOrderComponent],
  imports: [
    CommonModule,
    AdminOrderRoutingModule,
    AdminCommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class AdminOrderModule {}
