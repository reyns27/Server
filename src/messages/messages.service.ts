import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BodyMessageDto, CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageService: Repository<Message>,
    private userService: UserService) { }

  async create(createMessageDto: CreateMessageDto) {
    const validFrom = await this.userService.findOne(+createMessageDto.formWho);
    if (!validFrom) return new HttpException('FROM_NOT_FOUND', HttpStatus.NOT_FOUND);
    const validFor = await this.userService.findOne(+createMessageDto.forWho);
    if (!validFor) return new HttpException('FOR_NOT_FOUND', HttpStatus.NOT_FOUND);
    const result = this.messageService.create(createMessageDto);
    return this.messageService.save(result);
  }

  async OneToOne(params: BodyMessageDto) {
    const validFrom = await this.userService.findOne(+params.forWho);
    if (!validFrom) return new HttpException('FROM_NOT_FOUND', HttpStatus.NOT_FOUND);
    const validFor = await this.userService.findOne(+params.fromWho);
    if (!validFor) return new HttpException('FOR_NOT_FOUND', HttpStatus.NOT_FOUND);
    return this.messageService.find({
      where: {
        forWho: params.forWho,
        fromWho: params.fromWho
      }
    });

  }

  async findAll(id: string) {
    const validFrom = await this.userService.findOne(+id);
    if (!validFrom) return new HttpException('FROM_NOT_FOUND', HttpStatus.NOT_FOUND);
    return this.messageService.find({
      where: {
        fromWho: id
      }
    });
  }
}
