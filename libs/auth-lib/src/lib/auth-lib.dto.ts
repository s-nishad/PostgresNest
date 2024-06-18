import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class AuthLibLoginDto {
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password!: string;

}

export class AuthLibForgotPasswordDto {
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email!: string;
}

export class AuthLibResetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    token!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    new_password!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    confirm_new_password!: string;
}

export class AuthToken {
    @ApiProperty()
    accessToken: string = '';
}
