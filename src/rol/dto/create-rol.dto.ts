import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateRolDto {
  @ApiProperty()
  @MinLength(2)
  Code: string;

  @ApiProperty()
  Description: string;
  @ApiProperty()
  status: number;
}
