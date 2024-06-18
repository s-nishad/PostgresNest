import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserLibService, UserResponseDto } from '@postgresnest/user-lib';
import { JwtService } from '@nestjs/jwt';
import { CoreLibService } from '@postgresnest/core-lib';
import { AuthToken } from './auth-lib.dto';
import { MailLibService } from '@postgresnest/mail-lib';

@Injectable()
export class AuthLibService {
    constructor(
        private readonly userLibService: UserLibService,
        private readonly jwtService: JwtService,
        private readonly coreLibService: CoreLibService,
        private readonly mailLibService: MailLibService,
    ) {}

    async findUserByEmail(email: string): Promise<UserResponseDto> {
        return await this.userLibService.findOne({ email });
    }

    async login(email: string, password: string): Promise<AuthToken> {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException('Invalid Credentials');
        }
        const isPasswordValid = await this.coreLibService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async forgotPassword(email: string) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException('Email doesn\'t exist');
        }
        const token = this.coreLibService.generateToken({ email });
        const resetLink = `${process.env['FRONTEND_URL']}/reset-password?token=${token}`;
        await this.mailLibService.sendMail(email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
        return { message: 'If the email is registered, a reset link has been sent' };
    }

    async resetPassword(token: string, newPassword: string, confirmNewPassword: string) {
        const payload = this.coreLibService.verifyToken(token);
        if (!payload) {
            throw new UnauthorizedException('Invalid or expired token');
        }
        if (newPassword !== confirmNewPassword) {
            throw new UnauthorizedException('Passwords do not match');
        }
        await this.userLibService.updateUserPassword(payload.email, newPassword);
        return { message: 'Password has been reset successfully' };
    }
}
