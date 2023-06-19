import { AxiosResponse } from 'axios';
import { http } from './base.service';
import {
  ReqCreateVideoDto,
  ReqPagingDto,
  ResPagingDto,
  VideoDto,
} from '../dtos';

export const VideoService = {
  getVideosList: (
    params: ReqPagingDto,
  ): Promise<AxiosResponse<ResPagingDto<VideoDto>>> => {
    return http.get('/videos', {
      params: {
        skip: params.skip,
        take: params.take,
      },
    });
  },
  createVideo(body: ReqCreateVideoDto): Promise<AxiosResponse<VideoDto>> {
    return http.post('/videos', body);
  },
};
