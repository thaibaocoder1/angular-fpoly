import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturedComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturedComponent,
    NavbarComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
