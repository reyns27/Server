import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength, IsNumber } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @MinLength(2)
  @MaxLength(40)
  Name?: string;

  @ApiProperty()
  @MinLength(2)
  @MaxLength(40)
  lastName?: string;
  @ApiProperty()
  @IsEmail()
  email?: string;
  @ApiProperty()
  @MinLength(5)
  password?: string;
  @ApiProperty()
  @IsNumber()
  rolId?: number;

  updateAt: Date;
}
