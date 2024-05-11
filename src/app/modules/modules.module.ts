import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProductLatestComponent } from './home/home-product-latest/home-product-latest.component';
import { HomeProductArrivedComponent } from './home/home-product-arrived/home-product-arrived.component';
import { ProductsComponent } from './products/products.component';
import { ModulesRouting } from './modules-routing.module';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeProductLatestComponent,
    HomeProductArrivedComponent,
    ProductsComponent,
    ContactComponent,
    HomeComponent,
  ],
  imports: [CommonModule, ModulesRouting],
  exports: [HomeProductLatestComponent, HomeProductArrivedComponent],
})
export class ModulesModule {}
