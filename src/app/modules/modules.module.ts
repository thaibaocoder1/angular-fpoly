import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRouting } from './modules-routing.module';
import { HomeModule } from './home/home.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [CommonModule, ModulesRouting],
  exports: [],
})
export class ModulesModule {}
