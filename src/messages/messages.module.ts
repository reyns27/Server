import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports:[TypeOrmModule.forFeature([Message]),UserModule],
  exports:[MessagesService, MessagesController]
})
export class MessagesModule {}
