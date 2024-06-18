import { Test } from '@nestjs/testing';
import { AuthGuardController } from './auth-guard.controller';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardController', () => {
    let controller: AuthGuardController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthGuardService],
            controllers: [AuthGuardController],
        }).compile();

        controller = module.get(AuthGuardController);
    });

    it('should be defined', () => {
        expect(controller).toBeTruthy();
    });
});
