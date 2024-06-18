import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, Request} from '@nestjs/common';
import {UserLibService} from './user-lib.service';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserRequestDto, UserResponseDto, UpdateUserDto} from './user-lib.dto';
import {AuthGuardService, UserRequest} from "@postgresnest/auth-guard";
import {User} from "@prisma/client";


@Controller('user')
@ApiTags('User')
export class UserLibController {
    constructor(private readonly userLibService: UserLibService) {
    }

    @UseGuards(AuthGuardService)
    @ApiBearerAuth()
    @Get()
    @ApiOperation({summary: 'Get all users'})
    @ApiQuery({name: 'page', required: false})
    @ApiResponse({status: 200, description: 'Return all users.', type: [UserResponseDto]})
    async findAll(@Query('page') page = 1): Promise<{ data: UserResponseDto[]; page: number }> {
        const users = await this.userLibService.findAll(page);
        return {data: users.data, page};
    }

    @UseGuards(AuthGuardService)
    @ApiBearerAuth()
    @Get(':uuid')
    @ApiOperation({summary: 'Get a user by uuid'})
    @ApiResponse({status: 200, description: 'Return a single user.', type: UserResponseDto})
    @ApiParam({name: 'uuid', description: 'The unique identifier of the user', example: 'uuid-string'})
    async findOne(@Param('uuid') uuid: string): Promise<UserResponseDto | null> {
        return this.userLibService.findOne({uuid: uuid});
    }


    @Post()
    @ApiOperation({summary: 'Create a new user'})
    @ApiResponse({status: 201, description: 'The user has been successfully created.', type: UserResponseDto})
    @ApiBody({type: UserRequestDto})
    async create(@Body() createUserDto: UserRequestDto): Promise<UserResponseDto> {
        return new UserResponseDto(await this.userLibService.create(createUserDto));
    }

    @UseGuards(AuthGuardService)
    @ApiBearerAuth()
    @Put(':uuid')
    @ApiOperation({summary: 'Update a user by UUID'})
    @ApiResponse({status: 200, description: 'The user has been successfully updated.'})
    @ApiParam({name: 'uuid', description: 'The unique identifier of the user', example: 'uuid'})
    @ApiBody({type: UpdateUserDto})
    async update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        return new UserResponseDto(await this.userLibService.updateUser(uuid, updateUserDto));
    }

    @UseGuards(AuthGuardService)
    @ApiBearerAuth()
    @Delete(':uuid')
    @ApiOperation({summary: 'Delete a user by ID'})
    @ApiResponse({status: 200, description: 'The user has been successfully deleted.', type: UserResponseDto})
    @ApiParam({name: 'uuid', description: 'The unique identifier of the user', example: 'uuid-string'})
    async remove(@Param('uuid') uuid: string): Promise<UserResponseDto> {
        return new UserResponseDto(await this.userLibService.remove({uuid: uuid}));
    }

    @UseGuards(AuthGuardService)
    @ApiBearerAuth()
    @Get('loggedInUser')
    async getCurrentUser(@Req() request: UserRequest): Promise<UserResponseDto> {
        return new UserResponseDto(await this.userLibService.loggedInUser(request));
    }


}
