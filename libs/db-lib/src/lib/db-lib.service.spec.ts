import { Test } from '@nestjs/testing';
import { DbLibService } from './db-lib.service';

describe('DbLibService', () => {
  let service: DbLibService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DbLibService],
    }).compile();

    service = module.get(DbLibService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
