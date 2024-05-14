import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProductArrivedComponent } from './home-product-arrived/home-product-arrived.component';
import { HomeProductLatestComponent } from './home-product-latest/home-product-latest.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeProductArrivedComponent,
    HomeProductLatestComponent,
    HomeComponent,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
