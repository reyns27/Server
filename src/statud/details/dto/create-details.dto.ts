import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength, Length } from "class-validator";
export class CreateDetailsDto {
    @ApiProperty()
    statudId: number;

    @ApiProperty()
    type: number;

    @ApiProperty()
    @Length(2,50)
    descripcion: string;

    @ApiProperty()
    value: number;
}