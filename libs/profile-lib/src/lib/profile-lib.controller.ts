import {Controller, Get} from '@nestjs/common';
import { ProfileLibService } from './profile-lib.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('profile-lib')
@ApiTags('profile')
export class ProfileLibController {
    constructor(private profileLibService: ProfileLibService) {}


    @Get()
    @ApiOperation({summary: 'Get profile'})
    @ApiResponse({status: 200, description: 'Return all users.'})
    async getProfile() {
        return await this.profileLibService.getProfile();
    }


}
