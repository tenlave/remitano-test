import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from 'antd/lib/button';
import { UserDto } from '../../../shared/dtos';
import { StateAuthToken, StateLoggedInUserInfo } from '../../../shared/states';
import { LocalStorageConst } from '../../../shared/consts';
import Style from '../styles/user-info.module.scss';

const UserInfo: FC = () => {
  const userInfo = useRecoilValue<UserDto | null>(StateLoggedInUserInfo);
  const setAuthenToken = useSetRecoilState(StateAuthToken);
  const navigate = useNavigate();

  const logoutFn = useCallback(() => {
    setAuthenToken('');
    localStorage.setItem(LocalStorageConst.AuthenToken, '');
  }, [setAuthenToken]);

  const navigateToShare = useCallback(() => {
    navigate('/share');
  }, [navigate]);

  return (
    <div data-testid="user-info" className={Style.userInfoContainer}>
      {userInfo && (
        <>
          <span>Welcome {userInfo.email}</span>

          <Button type="primary" onClick={navigateToShare}>
            Share a movie
          </Button>

          <Button onClick={logoutFn}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
