import { Module } from '@nestjs/common';
import { ProfileLibController } from './profile-lib.controller';
import { ProfileLibService } from './profile-lib.service';

@Module({
    controllers: [ProfileLibController],
    providers: [ProfileLibService],
    exports: [ProfileLibService],
})
export class ProfileLibModule {}
