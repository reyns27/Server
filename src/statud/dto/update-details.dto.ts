import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDetailsDto } from "./create-details.dto";

export class UpdatedDetailsDto extends PartialType(CreateDetailsDto){
    @ApiProperty()
    statud: number;
}