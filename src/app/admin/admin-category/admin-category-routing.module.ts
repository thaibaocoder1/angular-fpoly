import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin-category.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCategoryRoutingModule {}
