import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./admin-product/admin-product.module').then(
        (m) => m.AdminProductModule
      ),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./admin-category/admin-category.module').then(
        (m) => m.AdminCategoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}