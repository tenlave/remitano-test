import { FC, useCallback } from 'react';
import Style from '../styles/share-video.module.scss';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { ReqCreateVideoDto } from '../../../shared/dtos';
import { VideoService } from '../../../shared/services';
import { toast } from 'react-toastify';
import { Col, Row } from 'antd';

const SharedVideo: FC = () => {

  const submitFn = useCallback(async (body: ReqCreateVideoDto) => {
    await VideoService.createVideo(body);
    toast('Video created successfully');
  }, [])

  return (
    <Form
      layout="horizontal"
      autoComplete="off"
      className={Style.form}
      onFinish={submitFn}
    >
      <Row className={Style.formItem}>
        <Col span={7}>
          <div className={Style.title}>Youtube URL:</div>
        </Col>
        <Col span={17}>
          <Form.Item name="url" label=""  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={17} offset={7}>
          <Button type="primary" htmlType="submit">Share</Button>
        </Col>
      </Row>


    </Form>
  )
}

export default SharedVideo
