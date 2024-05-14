import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
  declarations: [ProductsComponent, ProductsDetailComponent, ProductsListComponent],
  imports: [CommonModule, SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
