import { Controller } from '@nestjs/common';
import { CoreLibService } from './core-lib.service';

@Controller('core-lib')
export class CoreLibController {
    constructor(private coreLibService: CoreLibService) {}
}
