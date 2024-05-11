import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedRoutingModule } from './shared-routing.module';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BannerComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
