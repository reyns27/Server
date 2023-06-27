import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength } from "class-validator";
export class CreateDetailsDto {
    @ApiProperty()
    statudId: number;
    @ApiProperty()
    type: number;
    @ApiProperty()
    @MinLength(2)
    @MaxLength(50)
    descripcion: string;
    @ApiProperty()
    value: number;
}