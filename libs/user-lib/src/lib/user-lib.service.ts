import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {DbLibService} from '@postgresnest/db-lib';
import {UserResponseDto, UserRequestDto, UpdateUserDto} from './user-lib.dto';
import {CoreLibService} from '@postgresnest/core-lib';
import {UserRequest} from "@postgresnest/auth-guard";

@Injectable()
export class UserLibService {
    constructor(
        private readonly prisma: DbLibService,
        private readonly coreLibService: CoreLibService,
    ) {
    }

    async create(data: UserRequestDto): Promise<UserResponseDto> {
        try {
            const hashedPassword = await this.coreLibService.hashPassword(data.password);
            const userData = {...data, password: hashedPassword};
            const user = await this.prisma.user.create({
                data: {
                    ...userData,
                    username: userData.email,
                },
            });
            return new UserResponseDto(user);
        } catch (error: unknown) {
            this.handleError(error, 'creating user');
        }
    }

    async findAll(page: number): Promise<{ data: UserResponseDto[]; page: number }> {
        const take = 20;
        const skip = (page - 1) * take;
        try {
            const users = await this.prisma.user.findMany({
                skip,
                take,
                orderBy: {
                    id: 'asc',
                },
            });
            const data = users.map((user) => new UserResponseDto(user));
            return {data, page};
        } catch (error: unknown) {
            this.handleError(error, 'fetching users');
        }
    }

    async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<UserResponseDto> {
        try {
            const user = await this.prisma.user.findUnique({
                where: userWhereUniqueInput,
            });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return new UserResponseDto(user);
        } catch (error: unknown) {
            this.handleError(error, 'fetching user');
        }
    }

    async updateUser(uuid: string, data: UpdateUserDto): Promise<UserResponseDto> {
        try {
            const user = await this.prisma.user.update({
                where: {uuid},
                data,
            });
            return new UserResponseDto(user);
        } catch (error: unknown) {
            this.handleError(error, 'updating user');
        }
    }

    async remove(where: Prisma.UserWhereUniqueInput): Promise<UserResponseDto> {
        try {
            const user = await this.prisma.user.delete({
                where,
            });
            return new UserResponseDto(user);
        } catch (error: unknown) {
            this.handleError(error, 'deleting user');
        }
    }

    async updateUserPassword(email: string, newPassword: string): Promise<void> {
        const hashedPassword = await this.coreLibService.hashPassword(newPassword);
        try {
            await this.prisma.user.update({
                where: {email},
                data: {password: hashedPassword},
            });
        } catch (error) {
            throw new HttpException('Error updating password', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async loggedInUser(request: UserRequest): Promise<UserResponseDto> {
        console.log('Request User:', JSON.stringify(request.user, null, 2));
        console.log(request.user)
        return request.user;
    }

    private handleError(error: unknown, action: string): never {
        if (error instanceof Error) {
            throw new HttpException(`Error ${action}: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            throw new HttpException(`Unknown error ${action}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
