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
import useFormValidate from '../../../shared/hooks/form-validate.hook';

const Login: FC = () => {
  const setAuthenToken = useSetRecoilState(StateAuthToken);
  const [form] = Form.useForm<ReqLoginDto>();
  const { submittable } = useFormValidate(form);

  const loginFn = useCallback(
    async (body: ReqLoginDto) => {
      const result = await AuthService.login(body);
      setAuthenToken(result.data.accessToken);
      localStorage.setItem(
        LocalStorageConst.AuthenToken,
        result.data.accessToken,
      );
    },
    [setAuthenToken],
  );

  return (
    <Form
      data-testid="login-form"
      layout="inline"
      autoComplete="off"
      className={Style.form}
      form={form}
      onFinish={loginFn}
    >
      <Form.Item name="email" rules={[{ required: true }]}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Button
        data-testid="submit-login-form"
        type="primary"
        htmlType="submit"
        disabled={!submittable}
      >
        Login/Register
      </Button>
    </Form>
  );
};

export default Login;
