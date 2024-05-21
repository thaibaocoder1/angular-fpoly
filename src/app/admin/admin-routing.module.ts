import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

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
  {
    path: 'user',
    loadChildren: () =>
      import('./admin-user/admin-user.module').then((m) => m.AdminUserModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./admin-auth/admin-auth.module').then((m) => m.AdminAuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
