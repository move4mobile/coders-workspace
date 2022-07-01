import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':id',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), UiModule],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
