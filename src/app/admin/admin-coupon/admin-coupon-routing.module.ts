import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCouponComponent } from './admin-coupon.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCouponComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCouponRoutingModule {}
