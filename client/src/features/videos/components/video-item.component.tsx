import DislikeOutlined from '@ant-design/icons/lib/icons/DislikeOutlined';
import LikeOutlined from '@ant-design/icons/lib/icons/LikeOutlined';
import { FC } from 'react';
import { VideoDto } from '../../../shared/dtos';
import Style from '../styles/video-item.module.scss';

export interface IVideoItemProps {
  video: VideoDto;
}

const VideoItem: FC<IVideoItemProps> = (props: IVideoItemProps) => {
  return (
    <div className={Style.videoItem}>
      <video
        controls
        controlsList="nodownload"
        preload=""
        style={{ maxHeight: '400px' }}
      >
        <source src={props.video.url} type="video/mp4" />
      </video>

      <div className={Style.videoDesc}>
        <div className={Style.videoMetadata}>
          <div>
            <div className={Style.videoTitle}>Movie Title</div>
            <div>Shared by: {props.video.userEmail}</div>
            <div>
              {props.video.upVote}
              <LikeOutlined />
              &nbsp;&nbsp;
              {props.video.downVote}
              <DislikeOutlined />
            </div>
          </div>

          <LikeOutlined className={Style.likeButton} />
        </div>
        <div>Description:</div>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
