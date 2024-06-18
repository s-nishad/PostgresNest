import {IsString, IsEmail, IsOptional, IsEnum, IsDate, IsUUID} from 'class-validator';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {User, UserType} from '@prisma/client';
import {Exclude} from "class-transformer";
import {BaseDto} from '@postgresnest/core-lib'

export class UserRequestDto {
    @ApiProperty({example: 'Shohanur', description: 'The first name of the user'})
    @IsString()
    first_name!: string;

    @ApiProperty({example: 'Nishad', description: 'The last name of the user'})
    @IsString()
    last_name!: string;

    @ApiProperty({example: 'nishad', description: 'The username of the user'})
    @IsString()
    username!: string;

    @ApiProperty({example: 'password123', description: 'The password of the user'})
    @IsString()
    password!: string;

    @ApiProperty({example: 'nishad@example.com', description: 'The email of the user'})
    @IsEmail()
    email!: string;

    @ApiProperty({example: '123-456-7890', description: 'The contact number of the user', required: false})
    @IsOptional()
    @IsString()
    contact?: string;

    @ApiProperty({enum: UserType, example: UserType.CUSTOMER, description: 'The type of the user'})
    @IsEnum(UserType)
    type?: UserType;
}

export class UserResponseDto extends BaseDto implements User {

    constructor(partial: UserResponseDto | null) {
        super();
        Object.assign(this, partial);
    }

    @ApiProperty()
    first_name!: string;

    @ApiProperty()
    last_name!: string;

    @ApiProperty()
    username!: string;

    @Exclude()
    password!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty()
    contact!: string | null;

    @ApiProperty()
    type!: UserType;

    @ApiProperty()
    last_login!: Date | null;
}

export class UpdateUserDto extends OmitType(UserRequestDto, ['password', 'type'] as const) {}

