import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength, IsNumber, IsNotEmpty } from 'class-validator';

export class EmailDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    Email: string;
}