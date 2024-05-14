import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRouting } from './modules-routing.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ModulesRouting],
  exports: [],
})
export class ModulesModule {}
