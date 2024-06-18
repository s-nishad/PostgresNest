import { Test } from '@nestjs/testing';
import { ProfileLibController } from './profile-lib.controller';
import { ProfileLibService } from './profile-lib.service';

describe('ProfileLibController', () => {
    let controller: ProfileLibController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ProfileLibService],
            controllers: [ProfileLibController],
        }).compile();

        controller = module.get(ProfileLibController);
    });

    it('should be defined', () => {
        expect(controller).toBeTruthy();
    });
});
