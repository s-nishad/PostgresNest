import { Test } from '@nestjs/testing';
import { DbLibController } from './db-lib.controller';
import { DbLibService } from './db-lib.service';

describe('DbLibController', () => {
  let controller: DbLibController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DbLibService],
      controllers: [DbLibController],
    }).compile();

    controller = module.get(DbLibController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
