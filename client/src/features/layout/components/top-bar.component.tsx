import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Style from '../styles/top-bar.module.scss';
import { useRecoilValue } from 'recoil';
import { StateLoggedInUserInfo } from '../../../shared/states';
import { UserDto } from '../../../shared/dtos';
import Login from './login.component';
import UserInfo from './user-info.component';

const TopBar: FC = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue<UserDto | null>(StateLoggedInUserInfo);

  const userInfoElement = useMemo(() => {
    return userInfo ? <UserInfo data-testid="user-info" /> : <Login />;
  }, [userInfo]);

  return (
    <Row data-testid="top-bar" className={Style.topBarContainer}>
      <Col span={8}>
        <div className={Style.homeButton} onClick={() => navigate('/')}>
          <HomeOutlined className={Style.homeIcon} />
          <Title level={3}>Funny Movies</Title>
        </div>
      </Col>

      <Col span={16}>{userInfoElement}</Col>
    </Row>
  );
};

export default TopBar;
