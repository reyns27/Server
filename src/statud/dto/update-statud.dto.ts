import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStatudDto } from './create-statud.dto';

export class UpdateStatudDto extends PartialType(CreateStatudDto) {
    @ApiProperty()
    statud: number;
}
