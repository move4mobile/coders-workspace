import { AuthUser, User } from "../models";
import { IUser } from "../interfaces";
import { plainToClass } from "class-transformer";
import { PrismaUser } from "@gamify/data";

export class UserConverter {
    static fromAuthUserModel(authUserModel: AuthUser): IUser {
        return {
            id: authUserModel.id,
            createdAt: authUserModel.createdAt,
            email: authUserModel.email,
            firstname: authUserModel.firstname,
            lastname: authUserModel.lastname,
            moderationRole: authUserModel.moderationRole,
        }
    }

    static fromPrismaUser(prismaUser: PrismaUser): IUser {
        return plainToClass(User, prismaUser);
    }
}