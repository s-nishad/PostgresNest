import { Module } from '@nestjs/common';
import { CoreLibController } from './core-lib.controller';
import { CoreLibService } from './core-lib.service';
import { DbLibModule } from '@postgresnest/db-lib';
import { MailLibModule } from '@postgresnest/mail-lib';

@Module({
    controllers: [CoreLibController],
    providers: [CoreLibService],
    exports: [CoreLibService],
    imports: [DbLibModule, MailLibModule],
})
export class CoreLibModule {}
