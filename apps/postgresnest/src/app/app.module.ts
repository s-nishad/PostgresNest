import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserLibModule} from "@postgresnest/user-lib";
import {AuthLibModule} from "@postgresnest/auth-lib";
import {DbLibModule} from "@postgresnest/db-lib";
import {CoreLibModule} from "@postgresnest/core-lib";
import {MailLibModule} from "@postgresnest/mail-lib";
import {ProfileLibModule} from "@postgresnest/profile-lib";

@Module({
    imports: [UserLibModule, AuthLibModule, CoreLibModule, DbLibModule, MailLibModule, ProfileLibModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
