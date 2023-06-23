import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRolDto } from './create-rol.dto';

export class UpdateRolDto extends PartialType(CreateRolDto) {
  @ApiProperty()
  Code: string;
  @ApiProperty()
  Description: string;

  status: number;
}
