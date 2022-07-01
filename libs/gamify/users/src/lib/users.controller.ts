import { Roles, User } from '@gamify/auth';
import { Role, UserConverter, AuthUser } from '@gamify/shared';
import { ApplicationsService, BadgesService, UsersService } from '@gamify/data';
import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AssignBadgeDto } from './dto/give-badge.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly applicationsService: ApplicationsService,
    private readonly badgesService: BadgesService,
  ) {}

  @Get('/me')
  me(@User() authUser: AuthUser) {
    return UserConverter.fromAuthUserModel(authUser);
  }

  @Get('/')
  async findAll() {
    return (await this.usersService.findMany()).map(UserConverter.fromAuthUserModel);
  }
  
  @Post('/:id/badges')
  @Roles(Role.ADMIN, Role.MODERATOR)
  async assignBadge(@Param('id', ParseIntPipe) id: number, @Body() assignBadgeDto: AssignBadgeDto, @User() authUser: AuthUser) {
    const badge = await this.badgesService.findOne(assignBadgeDto.badgeId);

    if (! badge) {
      throw new BadRequestException('Badge not found');
    }

    if (! await this.applicationsService.canModerateApplicationById(badge.applicationId, authUser.id)) {
      throw new ForbiddenException();
    }

    // Check if the user joined the application, this will indirectly check if the user exists.
    if (! await this.applicationsService.findApplicationUser(badge.applicationId, id)) {
      throw new BadRequestException("User doesn't belong to this application");
    }

    if (! badge.repeatedlyObtainable) {
      // The badge is not repeatedly obtainable, so we check if the user already has it.
      const userBadges = await this.usersService.findUserBadges(id);
      if (userBadges.some(userBadge => userBadge.badgeId === badge.id)) {
        throw new BadRequestException("User already has this badge");
      }
    }
    
    return await this.usersService.assignBadgeToUser(id, badge.id);
  }

  @Delete('/badges/:userBadgeId')
  @Roles(Role.ADMIN, Role.MODERATOR)
  async removeBadge(@Param('userBadgeId', ParseIntPipe) id: number, @User() authUser: AuthUser) {
    const userBadge = await this.usersService.findUserBadge(id);

    if (!userBadge) {
      throw new BadRequestException('User badge not found');
    }

    const badge = await this.badgesService.findOne(userBadge.badgeId);

    if (! await this.applicationsService.canModerateApplicationById(badge.applicationId, authUser.id)) {
      throw new ForbiddenException();
    }

    return this.usersService.removeUserBadge(id);
  }

  @Get('/:id/badges')
  async getUserBadges(
    @Param('id', ParseIntPipe) id: number, 
    @Query('applicationId') applicationId?: number
  ) {
    return this.usersService.findUserBadges(id, applicationId);
  }

  @Get('/:id/applications')
  async getUserApplications(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findUserApplications(id);
  }

  @Get(':id/favorite-badges')
  async getFavoriteBadges(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findFavoriteBadges(id);
  }
}
