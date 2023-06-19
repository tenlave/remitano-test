import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { ReqCreateVideoDto, ResVideoListItemDto } from './dtos';
import { JwtUser } from '../../shared/decorators/jwt-user.dto';
import { WsGatewayService } from '../ws_gateway/ws_gateway.service';
import { WsTopicConst } from '../ws_gateway/consts';
import { ReqPagingDto, ResBasePagingDto } from '../../shared/dtos';
import { JwtAuthGuard } from '../auth/guards';

@Controller('videos')
export class VideoController {
  constructor(
    private videoService: VideoService,
    private wsGatewayService: WsGatewayService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createVideo(
    @Body() req: ReqCreateVideoDto,
    @JwtUser() currentUser,
  ): Promise<ResVideoListItemDto> {
    const res = await this.videoService.createVideo(req, Number(currentUser.sub));
    this.wsGatewayService.server
      .emit(WsTopicConst.VideoCreated, res as any);
    return res;
  }

  @Get()
  async getVideos(
    @Body() req: ReqPagingDto,
  ): Promise<ResBasePagingDto<ResVideoListItemDto>> {
    return this.videoService.getVideos(req);
  }
}
