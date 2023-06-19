import useSocketContext from './socket.hook';
import { useEffect } from 'react';
import { UserDto, VideoDto } from '../dtos';
import { useRecoilValue } from 'recoil';
import { StateLoggedInUserInfo } from '../states';
import { toast } from 'react-toastify';
import { WsTopicConst } from '../consts';

const useVideoNotification = () => {
  const { socket } = useSocketContext();
  const userInfo = useRecoilValue<UserDto | null>(StateLoggedInUserInfo);

  useEffect(() => {
    if (socket && userInfo) {
      socket.on(WsTopicConst.VideoCreated, (data: VideoDto) => {
        if (userInfo.email !== data.userEmail) {
          toast(`A new video has been shared by ${data.userEmail}`);
        }
      });

      return () => {
        socket.off(WsTopicConst.VideoCreated);
      };
    }
  }, [socket, userInfo]);

  return;
};

export default useVideoNotification;
