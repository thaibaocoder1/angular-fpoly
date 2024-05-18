import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCategoryRoutingModule } from './admin-category-routing.module';
import { AdminCategoryComponent } from './admin-category.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';

@NgModule({
  declarations: [AdminCategoryComponent],
  imports: [CommonModule, AdminCategoryRoutingModule, AdminCommonModule],
})
export class AdminCategoryModule {}
