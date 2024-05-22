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
import { FormatDirective } from './directives/format.directive';
import { AccountSidebarComponent } from './components/account-sidebar/account-sidebar.component';
import { FormatV2Directive } from './directives/format-v2.directive';
import { ModalComponent } from './components/modal/modal.component';

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
    FormatDirective,
    AccountSidebarComponent,
    FormatV2Directive,
    ModalComponent,
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
    FormatDirective,
    AccountSidebarComponent,
    FormatV2Directive,
    ModalComponent,
  ],
})
export class SharedModule {}
