import { Test } from '@nestjs/testing';
import { CoreLibController } from './core-lib.controller';
import { CoreLibService } from './core-lib.service';

describe('CoreLibController', () => {
    let controller: CoreLibController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [CoreLibService],
            controllers: [CoreLibController],
        }).compile();

        controller = module.get(CoreLibController);
    });

    it('should be defined', () => {
        expect(controller).toBeTruthy();
    });
});
