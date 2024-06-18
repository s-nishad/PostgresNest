import {ApiProperty} from '@nestjs/swagger';

export class BaseDto {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    uuid!: string;

    @ApiProperty()
    created_at!: Date;

    @ApiProperty()
    updated_at!: Date;
}
