import { Test } from '@nestjs/testing';
import { CoreLibService } from './core-lib.service';

describe('CoreLibService', () => {
    let service: CoreLibService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [CoreLibService],
        }).compile();

        service = module.get(CoreLibService);
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });
});
