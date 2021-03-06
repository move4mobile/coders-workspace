import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateApplicationInput } from './dto/create-application.input';
import { UpdateApplicationInput } from './dto/update-application.input';
import { Application, ApplicationUser, Role, AuthUser } from '@gamify/shared';
import { Roles, User } from '@gamify/auth';
import { ApplicationUserModel } from './models';
import { ApplicationsService } from '@gamify/data';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private applicationsService: ApplicationsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.MODERATOR)
  async create(@Body() createApplicationInput: CreateApplicationInput, @User() user: AuthUser): Promise<Application> {
    createApplicationInput.ownerUserId = user.id;

    return await this.applicationsService.create(createApplicationInput);
  }

  @Get()
  findAll(@Query('filter') filter: string, @User() user: AuthUser): Promise<Application[]> {
    return this.applicationsService.findMany(filter, user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Application> {
    return this.findApplicationOrFail(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.MODERATOR)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateApplicationInput: UpdateApplicationInput, @User() user: AuthUser): Promise<Application> {
    if (! await this.applicationsService.canModerateApplicationById(id, user.id)) {
      throw new ForbiddenException();
    }

    await this.findApplicationOrFail(id);

    return await this.applicationsService.update(id, updateApplicationInput);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.MODERATOR)
  async remove(@Param('id', ParseIntPipe) id: number, @User() user: AuthUser): Promise<Application> {
    if (! await this.applicationsService.canModerateApplicationById(id, user.id)) {
      throw new ForbiddenException();
    }

    await this.findApplicationOrFail(id);

    return await this.applicationsService.remove(id);
  }

  @Get('/:id/users')
  async findUsers(@Param('id', ParseIntPipe) id: number): Promise<ApplicationUser[]> {
    await this.findApplicationOrFail(id);

    return this.applicationsService.findApplicationUsers(id);
  }


  @Post('/:id/join')
  async join(@Param('id', ParseIntPipe) id: number, @User() user: AuthUser): Promise<ApplicationUserModel> {
    await this.findApplicationOrFail(id);

    if (await this.applicationsService.findApplicationUser(id, user.id)) {
      throw new BadRequestException("User is already a member of this application");
    }
    
    return this.applicationsService.addUserToApplication(id, user.id);
  }

  @Delete('/:id/leave')
  async leave(@Param('id', ParseIntPipe) id: number, @User() user: AuthUser): Promise<ApplicationUserModel> {
    await this.findApplicationOrFail(id);

    const applicationUser = await this.applicationsService.findApplicationUser(id, user.id);
    if (applicationUser === null) {
      throw new BadRequestException("User is not a member of this application");
    }

    return this.applicationsService.removeUserFromApplication(id, user.id);
  }

  /**
   * Tries to find a application in the database by id. When the applications doesn't exist it throws a NotFoundException
   * 
   * @param id The id of the applications.
   * @returns A application when found in the database.
   */
  private async findApplicationOrFail(id: number): Promise<Application> {
    const app = await this.applicationsService.findOne(id);

    if (app === null) {
      throw new NotFoundException();
    }

    return app;
  }
}
