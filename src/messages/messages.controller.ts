import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, BodyMessageDto } from './dto/create-message.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('messages')
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll(@Body() params:BodyMessageDto) {
    return this.messagesService.OneToOne(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findAll(id);
  }

}
