import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OfferComponent } from './components/offer/offer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturedComponent,
    NavbarComponent,
    SidebarComponent,
    OfferComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturedComponent,
    NavbarComponent,
    SidebarComponent,
    OfferComponent,
  ],
})
export class SharedModule {}
