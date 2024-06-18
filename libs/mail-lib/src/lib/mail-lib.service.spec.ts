import { Test } from '@nestjs/testing';
import { MailLibService } from './mail-lib.service';

describe('MailLibService', () => {
    let service: MailLibService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [MailLibService],
        }).compile();

        service = module.get(MailLibService);
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });
});
