import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRouting } from './modules-routing.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ModulesRouting],
  exports: [],
})
export class ModulesModule {}
