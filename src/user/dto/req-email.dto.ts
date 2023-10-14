import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength, IsNumber } from 'class-validator';

export class EmailDto {
    @ApiProperty()
    @IsEmail()
    Email: string;
}