import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}
