import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { InfoComponent } from './info/info.component';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent, InfoComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
