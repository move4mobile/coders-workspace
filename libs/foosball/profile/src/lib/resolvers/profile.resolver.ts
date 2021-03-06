import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from '../profile.service';
import { Profile } from '../models/profile.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }
}
