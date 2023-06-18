import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoEntity } from '../../entities';
import { WsGatewayModule } from '../ws_gateway/ws_gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoEntity]),
    WsGatewayModule
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
