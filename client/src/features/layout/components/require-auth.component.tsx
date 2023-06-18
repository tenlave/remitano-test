import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { StateLoggedInUserInfo } from '../../../shared/states';

const RequireAuth: FC = () => {
  const location = useLocation();
  const userInfo = useRecoilValue(StateLoggedInUserInfo);

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate
      to={''}
      state={{ from: location }}
      replace={true}
    />
  );
}

export default RequireAuth;
