import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsEmail } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(40)
  @IsEmail()
  email: string;
  @ApiProperty()
  @MinLength(5)
  password: string;
}
