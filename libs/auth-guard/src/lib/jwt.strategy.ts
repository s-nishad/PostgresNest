import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DbLibService } from "@postgresnest/db-lib";
import { User } from "@prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: DbLibService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: { email: string }){
        try {
            console.log(payload.email)
            const user = await this.prisma.user.findUnique({
                where: { email: payload.email },
            });
            if (!user) {
                throw new UnauthorizedException('User Not Found');
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
