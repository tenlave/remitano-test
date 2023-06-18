import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from 'antd/es/pagination';
import { VideoDto } from '../../../shared/dtos';
import VideoItem from './video-item.component';
import { VideoService } from '../../../shared/services';
import Style from '../styles/video.module.scss';

const Videos: FC = () => {
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [videos, setVideos] = useState<VideoDto[]>();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    const skip = (pageIndex - 1) * pageSize;
    void fetchData(skip, pageSize);
  }, [pageIndex]);

  const fetchData = useCallback(async (skip: number, take: number = pageSize) => {
    const { data } = await VideoService.getVideosList({ skip, take });
    setVideos(data.data);
    setTotal(data.total);
  }, []);

  const videoListElement = useMemo(() => {
    return !videos?.length
      ? <></>
      : (
        <>
          {videos?.map(videoItem => <VideoItem video={videoItem} />)}
        </>
      )
  }, [videos])

  return (
    <div className={Style.videoContainer}>
      {videoListElement}

      <Pagination
        onChange={(page: number) => setPageIndex(page)}
        defaultCurrent={pageIndex}
        total={total}
      />
    </div>
  )
}

export default Videos;
