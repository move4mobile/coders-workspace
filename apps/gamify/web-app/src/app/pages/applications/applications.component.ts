import { Component, OnInit } from '@angular/core';
import { Application, ApplicationUser } from '@gamify/shared';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'coders-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applications: Application[] = [];
  userApplications: ApplicationUser[] = [];

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser$().getValue();

    this.applicationService.list$().subscribe(applications => {
      this.applications = applications;
    });
    this.userService.listUserApplications$(user.id).subscribe(userApplications => {
      this.userApplications = userApplications;
    });
  }
}
