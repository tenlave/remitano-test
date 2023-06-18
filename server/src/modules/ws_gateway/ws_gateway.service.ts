import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('ws server: started');
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('ws client disconnected, ID: ', client.conn.remoteAddress);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log('ws client connected, ID: ', client.conn.remoteAddress);
  }
}
