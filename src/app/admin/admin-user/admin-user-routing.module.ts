import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './admin-user.component';
import { AdminUserTrashComponent } from './admin-user-trash/admin-user-trash.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserComponent,
  },
  {
    path: 'trash',
    component: AdminUserTrashComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUserRoutingModule {}
