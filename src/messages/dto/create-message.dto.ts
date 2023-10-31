import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsDate, IsDataURI } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty()
    @MinLength(1)
    text: string;
    @ApiProperty()
    @IsDataURI()
    imageUrl: string;
    @ApiProperty()
    @IsDataURI()
    videoUrl: string;
    @ApiProperty()
    @MinLength(1)
    formWho: string;
    @ApiProperty()
    @MinLength(1)
    forWho: string;
    @ApiProperty()
    @IsDate()
    sendDate: Date;
}

export class BodyMessageDto {
    @ApiProperty()
    @MinLength(1)
    fromWho: string;
    @ApiProperty()
    @MinLength(1)
    forWho: string;
}
