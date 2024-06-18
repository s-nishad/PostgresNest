import { Test } from '@nestjs/testing';
import { UserLibService } from './user-lib.service';

describe('UserLibService', () => {
  let service: UserLibService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserLibService],
    }).compile();

    service = module.get(UserLibService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
