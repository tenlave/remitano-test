import { FC, useCallback } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { AuthService } from '../../../shared/services';
import { ReqLoginDto } from '../../../shared/dtos';
import { useSetRecoilState } from 'recoil';
import { StateAuthToken } from '../../../shared/states';
import { LocalStorageConst } from '../../../shared/consts';
import Style from '../styles/login.module.scss';

const Login: FC = () => {
  const setAuthenToken = useSetRecoilState(StateAuthToken);

  const loginFn = useCallback(async (body: ReqLoginDto) => {
    const result = await AuthService.login(body);
    setAuthenToken(result.data.accessToken);
    localStorage.setItem(LocalStorageConst.AuthenToken, result.data.accessToken);
  }, [setAuthenToken])

  return (
    <Form
      layout="inline"
      autoComplete="off"
      className={Style.form}
      onFinish={loginFn}
    >
      <Form.Item name="email" rules={[{ required: true }]}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Button type="primary" htmlType="submit">Login/Register</Button>
    </Form>
  )
}

export default Login;
