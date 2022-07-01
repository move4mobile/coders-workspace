import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UiModule } from '../../ui.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [
    UsersComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UiModule
  ]
})
export class UsersModule { }
