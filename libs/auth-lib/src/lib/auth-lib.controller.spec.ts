import { Test } from '@nestjs/testing';
import { AuthLibController } from './auth-lib.controller';
import { AuthLibService } from './auth-lib.service';

describe('AuthLibController', () => {
  let controller: AuthLibController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthLibService],
      controllers: [AuthLibController],
    }).compile();

    controller = module.get(AuthLibController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
