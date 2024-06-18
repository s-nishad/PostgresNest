import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileLibService {
    async getProfile() {
        return Promise.resolve('This is from profile');
    }
}
