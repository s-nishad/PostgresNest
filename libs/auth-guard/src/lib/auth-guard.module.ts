import { Module } from '@nestjs/common';
import { AuthGuardController } from './auth-guard.controller';
import { AuthGuardService } from './auth-guard.service';
import {DbLibModule} from "@postgresnest/db-lib";
import {JwtStrategy} from "./jwt.strategy";
import {ConfigModule} from "@nestjs/config";

@Module({
    controllers: [AuthGuardController],
    providers: [AuthGuardService, JwtStrategy],
    exports: [AuthGuardService, JwtStrategy],
    imports: [DbLibModule, ConfigModule]
})
export class AuthGuardModule {}
