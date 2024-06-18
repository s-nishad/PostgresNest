import { Controller } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';

@Controller('auth-guard')
export class AuthGuardController {
    constructor(private authGuardService: AuthGuardService) {}
}
