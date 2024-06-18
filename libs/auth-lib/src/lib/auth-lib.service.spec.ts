import { Test } from '@nestjs/testing';
import { AuthLibService } from './auth-lib.service';

describe('AuthLibService', () => {
  let service: AuthLibService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthLibService],
    }).compile();

    service = module.get(AuthLibService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
