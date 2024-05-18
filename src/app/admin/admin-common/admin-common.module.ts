import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCommonComponent } from './admin-common.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminCommonComponent],
  imports: [CommonModule, SharedModule],
  exports: [AdminCommonComponent],
})
export class AdminCommonModule {}
