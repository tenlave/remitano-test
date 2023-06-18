import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from '../../entities';
import { ReqCreateVideoDto, ResVideoListItemDto } from './dtos';
import { ReqPagingDto, ResBasePagingDto } from '../../shared/dtos';

@Injectable()
export class VideoService {

  constructor(
    @InjectRepository(VideoEntity) private videoRepo: Repository<VideoEntity>
  ) {
  }

  async createVideo(req: ReqCreateVideoDto, userId: number): Promise<VideoEntity> {
    const newVideo = this.videoRepo.create();
    newVideo.url = req.url
    newVideo.userId = userId;
    return await this.videoRepo.save(newVideo);
  }

  async getVideos(req: ReqPagingDto): Promise<ResBasePagingDto<ResVideoListItemDto>> {
    const count = await this.videoRepo.count();
    const rawData = await this.videoRepo.find({
      take: req.take,
      skip: req.skip,
      relations: ['user']
    });
    const pagingData = rawData.map((video: VideoEntity) => {
      return {
        id: video.id,
        url: video.url,
        upVote: video.upVote,
        downVote: video.downVote,
        description: video.description,
        userId: video.userId,
        userEmail: video.user.email
      } as ResVideoListItemDto;
    })

    return {
      data: pagingData,
      total: count,
    }
  }
}
