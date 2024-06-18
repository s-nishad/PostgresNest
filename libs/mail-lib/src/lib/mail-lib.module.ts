import { Module } from '@nestjs/common';
import { MailLibController } from './mail-lib.controller';
import { MailLibService } from './mail-lib.service';

@Module({
    controllers: [MailLibController],
    providers: [MailLibService],
    exports: [MailLibService],
})
export class MailLibModule {}
