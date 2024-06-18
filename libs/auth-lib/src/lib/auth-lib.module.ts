import { Module } from '@nestjs/common';
import { AuthLibController } from './auth-lib.controller';
import { AuthLibService } from './auth-lib.service';
import { UserLibModule } from '@postgresnest/user-lib';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CoreLibModule } from '@postgresnest/core-lib';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailLibModule } from '@postgresnest/mail-lib';
import {DbLibModule} from "@postgresnest/db-lib";

@Module({
    imports: [
        PassportModule,
        DbLibModule,
        UserLibModule,
        CoreLibModule,
        MailLibModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '3h' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthLibController],
    providers: [AuthLibService],
    exports: [AuthLibService],
})
export class AuthLibModule {}
