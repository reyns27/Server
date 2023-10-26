import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import {Server, Socket} from 'socket.io';
import { SocketResquest } from './dto/SocketResquest';

@WebSocketGateway({
  cors:{origin:'*'}
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  afterInit(server: any) {
    console.log('conexión socket activa....');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Nuevo usuario connectado');
  }
  handleDisconnect(client: any) {
    console.log('Un usuario se ha desconectado');
  }

  @SubscribeMessage('event_set_room')
  handleSetRoom(client:Socket, room:string){
    client.join(`room_${room}`);
    console.log(`nuevo usuario a ingresado a la sala #${room}`);
  };

  @SubscribeMessage('message')
  handleJoinMessage(@MessageBody() data:SocketResquest, @ConnectedSocket() client:Socket){  
    console.log(client.id)
    client.broadcast.emit('message',{
      body:data.body,
      from:client.id
    });
  }
  constructor(private readonly chatService: ChatService) {}
}
