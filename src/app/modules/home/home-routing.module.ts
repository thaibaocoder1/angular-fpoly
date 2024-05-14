import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductLatestComponent } from './home-product-latest/home-product-latest.component';

const routes: Routes = [
  {
    path: '',
    component: HomeProductLatestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
