import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength, IsNumber, IsNotEmpty } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class resetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    Token: string;
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5)
    Password:string;
}