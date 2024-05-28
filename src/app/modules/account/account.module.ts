import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { InfoComponent } from './info/info.component';
import { AccountComponent } from './account.component';
import { SharedModule } from '../../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [AccountComponent, InfoComponent, OrdersComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
