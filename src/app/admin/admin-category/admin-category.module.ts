import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCategoryRoutingModule } from './admin-category-routing.module';
import { AdminCategoryComponent } from './admin-category.component';
import { AdminCommonModule } from '../admin-common/admin-common.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminCategoryAddComponent } from './admin-category-add/admin-category-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminCategoryComponent, AdminCategoryAddComponent],
  imports: [
    CommonModule,
    AdminCategoryRoutingModule,
    AdminCommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminCategoryModule {}
