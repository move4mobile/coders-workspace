import { ApplicationUserConverter } from '@gamify/shared';
import { Injectable } from '@nestjs/common';
import { DataService } from '../data.service';

@Injectable()
export class UsersService {

    constructor(private readonly data: DataService) {}

    findOne(id: number) {
        return this.data.user.findUnique({
            where: { id }
        });
    }

    findMany() {
        return this.data.user.findMany();
    }

    assignBadgeToUser(userId: number, badgeId: number) {
        return this.data.userBadge.create({
            data: {
                userId,
                badgeId
            }
        });
    }

    findUserBadge(userBadgeId: number) {
        return this.data.userBadge.findUnique({
            where: {
                id: userBadgeId
            }
        });
    }

    findUserBadges(userId: number, applicationId?: number) {
        const select = {
            id: true,
            badgeId: true,
            userId: true,
            earnedAt: true,
            badge: {
                select: {
                    name: true,
                    tier: true,
                    applicationId: true
                }
            }
        };
        if (applicationId) {
            return this.data.userBadge.findMany({
                where: {
                    userId,
                    badge: { applicationId }
                },
                select
            });
        }
        return this.data.userBadge.findMany({
            where: {
                userId
            },
            select
        });
    }

    removeUserBadge(userBadgeId: number) {
        return this.data.userBadge.delete({
            where: {
                id: userBadgeId
            }
        });
    }

    async findUserApplications(userId: number) {
        return (await this.data.applicationUser.findMany({
            where: {
                userId
            },
            select: {
                userId: true,
                applicationId: true,
                joinedAt: true,
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                    }
                }
            }
        })).map(appUser => ApplicationUserConverter.fromPrismaApplicationUser(appUser));
    }

    findFavoriteBadges(userId: number) {
        return this.data.favoriteBadge.findMany({
            where: {
                userId
            },
            select: {
                userId: true,
                badgeId: true,
                priority: true,
                badge: {
                    select: {
                        name: true,
                        tier: true,
                    }
                }
            }
        });
    }
}
