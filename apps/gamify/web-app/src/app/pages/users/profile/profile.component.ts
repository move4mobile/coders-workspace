import { Component, OnInit } from '@angular/core';
import { Application, ApplicationUser, Badge, BadgeTier, IFavoriteBadge, UserBadge } from '@gamify/shared';
import { combineLatestWith } from 'rxjs';
import { BadgesPerTier, ObtainedBadges } from '../../../core/interfaces';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import { BadgesService } from '../../../services/badges.service';
import { UsersService } from '../../../services/users.service';

interface UserApplicationProfile {
  application: Application,
  userApplication: ApplicationUser,
  badgesCount: BadgesPerTier,
  obtainedBadges: ObtainedBadges,
  unobtainedBadges: Badge[],

  obtainedBadgesCount: number,
  applicationBadgesCount: number,
  obtainedPercentage: number,
}

interface Stats {
  totalBadges: number,
  totalGames: number,
  bronzeBadges: number,
  silverBadges: number,
  goldBadges: number,
  platinumBadges: number,
}

interface FavoriteBadge {
  badge: {
    name: string,
    tier: BadgeTier,
  },
  amount: number,
  priority: number
}

@Component({
  selector: 'coders-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  badgeTier = {
    "BRONZE": BadgeTier.BRONZE,
    "SILVER": BadgeTier.SILVER,
    "GOLD": BadgeTier.GOLD,
    "PLATINUM": BadgeTier.PLATINUM
  }

  favoriteBadges: FavoriteBadge[] = [];

  stats: Stats = {
    totalBadges: 0,
    totalGames: 0,
    bronzeBadges: 0,
    silverBadges: 0,
    goldBadges: 0,
    platinumBadges: 0
  }

  userApplications: UserApplicationProfile[] = [];

  user$ = this.authService.getUser$();

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly applicationService: ApplicationService,
    private readonly badgesService: BadgesService,
  ) {}

  ngOnInit(): void {
    const user = this.user$.getValue();

    const userApplications = this.usersService.listUserApplications$(user.id);
    const applications = this.applicationService.list$();
    const badges = this.badgesService.list$();
    const userBadges = this.usersService.listUserBadges$(user.id);
    const favoriteBadges = this.usersService.listFavoriteBadges$(user.id);
    
    userApplications.pipe(
      combineLatestWith(applications, badges, userBadges, favoriteBadges),
    ).subscribe(([userApplications, applications, badges, userBadges, favoriteBadges]) => {
      this.aggregateUserApplications(userApplications, applications, badges, userBadges);
      this.calculateStats(userApplications, userBadges);
      this.calculateFavoriteBadges(favoriteBadges, userBadges);
    });
  }

  private aggregateUserApplications(userApplications: ApplicationUser[], applications: Application[], badges: Badge[], userBadges: UserBadge[]) {
    this.userApplications = userApplications.map(userApplication => {
      const application = applications.find(app => app.id === userApplication.applicationId);
      const applicationBadges = badges.filter(badge => badge.applicationId === application.id);
      const applicationUserBadges = userBadges.filter(userBadge => userBadge.badge.applicationId === application.id);
      
      const badgesCount = this.badgesService.calculateBadgesPerTier(applicationUserBadges);
      const obtainedBadges: ObtainedBadges = this.badgesService.calculateObtainedBadges(applicationUserBadges, badges);
      const obtainedBadgesCount = Object.keys(obtainedBadges).length;
      const obtainedPercentage = this.badgesService.calculateObtainedPercentage(obtainedBadges, applicationBadges.length);

      const unobtainedBadges = applicationBadges.filter(badge => ! applicationUserBadges.find(userBadge => userBadge.badgeId === badge.id));

      return {
        application,
        userApplication,
        badgesCount,
        obtainedBadges,
        unobtainedBadges,
        obtainedBadgesCount,
        applicationBadgesCount: applicationBadges.length,
        obtainedPercentage
      }
    });
  }

  private calculateStats(userApplications: ApplicationUser[], userBadges: UserBadge[]) {
    const stats = {
      totalBadges: 0,
      totalGames: 0,
      bronzeBadges: 0,
      silverBadges: 0,
      goldBadges: 0,
      platinumBadges: 0
    };

    stats.totalGames = userApplications.length;
    stats.totalBadges = userBadges.length;

    userBadges.forEach(userBadge => {
      switch (userBadge.badge.tier) {
        case BadgeTier.BRONZE:
          stats.bronzeBadges += 1;
          break;
        case BadgeTier.SILVER:
          stats.silverBadges += 1;
          break;
        case BadgeTier.GOLD:
          stats.goldBadges += 1;
          break;
        case BadgeTier.PLATINUM:
          stats.platinumBadges += 1;
          break;
      }
    });

    this.stats = stats;
  }

  private calculateFavoriteBadges(favoriteBadges: IFavoriteBadge[], userBadges: UserBadge[]) {
    this.favoriteBadges = favoriteBadges.map(favoriteBadge => { 
      let amount = 0;
      userBadges.forEach(userBadge => {
        if (userBadge.badgeId === favoriteBadge.badgeId) {
          amount++;
        }
      })

      return {
        badge: {
          name: favoriteBadge.badge.name,
          tier: favoriteBadge.badge.tier
        },
        amount,
        priority: favoriteBadge.priority
      }
    })
    // Sort the badges by priority, the badge with the highest priority is shown first (left)
    .sort((a, b) => {
      return b.priority - a.priority;
    }).splice(0, 5);
  }
}
