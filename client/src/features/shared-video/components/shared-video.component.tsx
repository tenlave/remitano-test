import { FC, useCallback } from 'react';
import Style from '../styles/share-video.module.scss';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { ReqCreateVideoDto } from '../../../shared/dtos';
import { VideoService } from '../../../shared/services';
import { toast } from 'react-toastify';
import { Col, Row } from 'antd';
import useFormValidate from '../../../shared/hooks/form-validate.hook';

const SharedVideo: FC = () => {
  const [form] = Form.useForm<ReqCreateVideoDto>();
  const { submittable } = useFormValidate(form);

  const submitFn = useCallback(async (body: ReqCreateVideoDto) => {
    await VideoService.createVideo(body);
    toast('Video created successfully');
  }, []);

  return (
    <Form
      data-testid="share-video-form"
      layout="horizontal"
      autoComplete="off"
      className={Style.form}
      onFinish={submitFn}
    >
      <Row className={Style.formItem}>
        <Col span={6}>
          <div className={Style.title}>Youtube URL:</div>
        </Col>
        <Col span={12}>
          <Form.Item name="url" label="" rules={[{ required: true }]}>
            <Input placeholder="url" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12} offset={6}>
          <Button
            data-testid="submit-form"
            type="primary"
            htmlType="submit"
            disabled={!submittable}
          >
            Share
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SharedVideo;
