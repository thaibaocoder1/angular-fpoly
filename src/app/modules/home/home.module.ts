import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeProductLatestComponent } from './home-product-latest/home-product-latest.component';
import { HomeProductArrivedComponent } from './home-product-arrived/home-product-arrived.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeProductLatestComponent,
    HomeProductArrivedComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class HomeModule {}
