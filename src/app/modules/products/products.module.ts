import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRelatedComponent } from './products-related/products-related.component';
import { ProductsTypeComponent } from './products-type/products-type.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsDetailComponent,
    ProductsListComponent,
    ProductsRelatedComponent,
    ProductsTypeComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
