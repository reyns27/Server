import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import {Server, Socket} from 'socket.io';
import { SocketResquest } from './dto/SocketResquest';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({
  cors:{origin:'*'}
})
@Injectable()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly chatService: ChatService, private readonly logger: Logger) {}
  @WebSocketServer() server: Server;
  afterInit(server: any) {
    this.logger.log(`Servidor socket: ${server} activo....`) 
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`${client.id} se ha connectado`) 
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`${client.id} se ha desconnectado`) 
  }

  @SubscribeMessage('event_set_room')
  handleSetRoom(client:Socket, room:string){
    client.join(`room_${room}`);
    this.logger.log(`${client.id} se ha a la sala: ${room}`) 
  };

  @SubscribeMessage('message')
  handleJoinMessage(@MessageBody() data:SocketResquest, @ConnectedSocket() client:Socket){  
    this.logger.log(`${client.id} ha enviado un mensaje`) 
    client.broadcast.emit('message',{
      body:data.body,
      from:client.id
    });
  }
  
}
