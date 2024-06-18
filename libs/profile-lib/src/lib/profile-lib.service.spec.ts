import { Test } from '@nestjs/testing';
import { ProfileLibService } from './profile-lib.service';

describe('ProfileLibService', () => {
    let service: ProfileLibService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ProfileLibService],
        }).compile();

        service = module.get(ProfileLibService);
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });
});
