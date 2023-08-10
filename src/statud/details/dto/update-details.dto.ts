import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDetailsDto } from "./create-details.dto";
import { Length } from "class-validator";

export class UpdatedDetailsDto {
    @ApiProperty()
    type: number;

    @ApiProperty()
    @Length(2,50)
    descripcion: string;

    @ApiProperty()
    value: number;
}