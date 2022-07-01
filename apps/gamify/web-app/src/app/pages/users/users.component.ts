import { Component, OnInit } from '@angular/core';
import { BadgeTier, User } from '@gamify/shared';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'coders-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stats', 'favorite-badges', 'actions'];
  dataSource: User[] = [];

  badgeTier = {
    "BRONZE": BadgeTier.BRONZE,
    "SILVER": BadgeTier.SILVER,
    "GOLD": BadgeTier.GOLD,
    "PLATINUM": BadgeTier.PLATINUM
  }

  constructor(
    private readonly userService: UsersService
  ) { }

  ngOnInit(): void {
    this.userService.listUsers$().subscribe(users => {
      this.dataSource = users;
    });
  }

}
