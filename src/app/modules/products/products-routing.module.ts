import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsComponent } from './products.component';
import { ProductsTypeComponent } from './products-type/products-type.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: ':slug',
        component: ProductsTypeComponent,
      },
      {
        path: 'detail/:id',
        component: ProductsDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
