import {Controller, Post, Body, HttpCode, UseGuards, Req} from '@nestjs/common';

import {ApiTags, ApiOkResponse, ApiResponse, ApiOperation, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import {AuthLibService} from "./auth-lib.service";
import {AuthLibForgotPasswordDto, AuthLibLoginDto, AuthLibResetPasswordDto, AuthToken} from "./auth-lib.dto";
import {AuthGuardService} from "@postgresnest/auth-guard";


@ApiTags('auth')
@Controller('auth')
export class AuthLibController {
    constructor(private readonly authLibService: AuthLibService) {
    }

    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login' })
    @ApiBody({ type: AuthLibLoginDto })
    @ApiResponse({ status: 201, type: AuthToken })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: AuthLibLoginDto): Promise<AuthToken> {
        return this.authLibService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(AuthGuardService)
    @ApiBearerAuth()
    @Post('forgot-password')
    @HttpCode(200)
    @ApiOkResponse({ description: 'If the email is registered, a reset link has been sent' })
    @ApiOkResponse({ type: AuthToken })
    async forgotPassword(@Body() { email }: AuthLibForgotPasswordDto) {
        return this.authLibService.forgotPassword(email);
    }

    @UseGuards(AuthGuardService)
    @ApiBearerAuth()
    @Post('reset-password')
    @HttpCode(200)
    @ApiOkResponse({ description: 'Password has been reset successfully' })
    async resetPassword(@Body() { token, new_password, confirm_new_password }: AuthLibResetPasswordDto) {
        return this.authLibService.resetPassword(token, new_password, confirm_new_password);
    }

}
