import { Module } from '@nestjs/common';
import { UserLibController } from './user-lib.controller';
import { UserLibService } from './user-lib.service';
import { DbLibModule } from '@postgresnest/db-lib';
import { CoreLibModule } from '@postgresnest/core-lib';
import {AuthGuardModule} from "@postgresnest/auth-guard";

@Module({
    controllers: [UserLibController],
    providers: [UserLibService],
    exports: [UserLibService],
    imports: [CoreLibModule, DbLibModule, AuthGuardModule],
})
export class UserLibModule {}
