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
import { CommonComponent } from './components/common/common.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponent } from './shared.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturedComponent,
    NavbarComponent,
    SidebarComponent,
    OfferComponent,
    CommonComponent,
    InputComponent,
    SharedComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    FeaturedComponent,
    NavbarComponent,
    SidebarComponent,
    OfferComponent,
    CommonComponent,
    InputComponent,
    SharedComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
  ],
})
export class SharedModule {}
