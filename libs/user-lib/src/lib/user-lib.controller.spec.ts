import { Test } from '@nestjs/testing';
import { UserLibController } from './user-lib.controller';
import { UserLibService } from './user-lib.service';

describe('UserLibController', () => {
  let controller: UserLibController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserLibService],
      controllers: [UserLibController],
    }).compile();

    controller = module.get(UserLibController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
