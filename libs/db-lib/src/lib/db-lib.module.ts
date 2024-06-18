import { Module } from '@nestjs/common';
import { DbLibController } from './db-lib.controller';
import { DbLibService } from './db-lib.service';

@Module({
  controllers: [DbLibController],
  providers: [DbLibService],
  exports: [DbLibService],
})
export class DbLibModule {}
