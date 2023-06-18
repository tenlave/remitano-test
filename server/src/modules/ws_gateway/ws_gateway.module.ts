import { Module } from '@nestjs/common';
import { WsGatewayService } from './ws_gateway.service';

@Module({
  providers: [WsGatewayService],
  exports: [WsGatewayService],
})
export class WsGatewayModule {}
