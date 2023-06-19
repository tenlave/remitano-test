import { FC, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import RequireAuth from './require-auth.component';
import Style from '../styles/layout.module.scss';
import { StateAuthToken } from '../../../shared/states';
import { LocalStorageConst } from '../../../shared/consts';
import Loadable from './loadable.component';
import Videos from '../../videos/components/videos.component';
import useVideoNotification from '../../../shared/hooks/video-notification.hook';

const SharedVideo = Loadable(
  lazy(() => import('../../shared-video/components/shared-video.component')),
);
const TopBar = Loadable(
  lazy(() => import('../../layout/components/top-bar.component')),
);

const Layout: FC = () => {
  const setAuthToken = useSetRecoilState(StateAuthToken);
  useVideoNotification();

  useEffect(() => {
    const authToken = localStorage.getItem(LocalStorageConst.AuthenToken);
    setAuthToken(authToken || '');
  }, [setAuthToken]);

  return (
    <div data-testid="layout-component" className={Style.layoutContainer}>
      <TopBar />

      <Routes>
        <Route path="/" element={<Videos />} />

        <Route element={<RequireAuth />}>
          <Route path="/share" element={<SharedVideo />} />
        </Route>

        <Route path="*" element={<>Not found</>} />
      </Routes>
    </div>
  );
};

export default Layout;
