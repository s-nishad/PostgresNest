import { Test } from '@nestjs/testing';
import { MailLibController } from './mail-lib.controller';
import { MailLibService } from './mail-lib.service';

describe('MailLibController', () => {
    let controller: MailLibController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [MailLibService],
            controllers: [MailLibController],
        }).compile();

        controller = module.get(MailLibController);
    });

    it('should be defined', () => {
        expect(controller).toBeTruthy();
    });
});
