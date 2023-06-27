import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength,IsDecimal } from "class-validator";
export class CreateStatudDto {
    @ApiProperty()
    @MinLength(2)
    @MaxLength(50)
    description: string;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    expenses: number;
    @ApiProperty()
    income: number;
    @ApiProperty()
    balance: number;

}
