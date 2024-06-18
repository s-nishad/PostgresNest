import { Controller } from '@nestjs/common';
import { MailLibService } from './mail-lib.service';

@Controller('mail-lib')
export class MailLibController {
    constructor(private mailLibService: MailLibService) {}
}
