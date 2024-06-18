import { Controller } from '@nestjs/common';
import { DbLibService } from './db-lib.service';

@Controller('db-lib')
export class DbLibController {
  constructor(private dbLibService: DbLibService) {}
}
