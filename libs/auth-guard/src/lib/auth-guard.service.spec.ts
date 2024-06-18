import { Test } from '@nestjs/testing';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
    let service: AuthGuardService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthGuardService],
        }).compile();

        service = module.get(AuthGuardService);
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });
});
