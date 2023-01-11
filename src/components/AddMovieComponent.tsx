import { Button, DatePicker, Form, Input, message, Modal, Rate } from 'antd';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../store/MovieStore';
import { getDateFormat } from './utils';

export const AddMovieComponent = observer(() => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(3);
  const [form] = Form.useForm();
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any): void => {
    const movieDate = getDateFormat(values.releaseDate.toDate());
    movieStore.addMovie(
      values.movieName,
      values.duration,
      movieDate,
      ratingValue,
      values.actor,
    );
    form.resetFields();
    setIsModalOpen(false);
    message.success(`New Movie '${values.movieName}' added successfully`);
  };

  const onFinishFailed = (errorInfo: any): void => {
    message.error('falied to add New Movie');
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Button onClick={showModal} style={{ color: 'blue' }}>
        Add New Movie
      </Button>
      <Modal
        title=' Add New Movie'
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Movie Name'
            name='movieName'
            rules={[{ required: true, message: 'Please input Movie Name!' }]}
          >
            <Input maxLength={12} />
          </Form.Item>

          <Form.Item
            label='Duration'
            name='duration'
            rules={[
              { required: true, message: 'Please input Movie Duration!' },
            ]}
          >
            <Input maxLength={8} />
          </Form.Item>

          <Form.Item
            label='Release Date'
            name='releaseDate'
            rules={[{ required: true, message: 'Please input Release Date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label='Actor'
            name='actor'
            rules={[{ required: true, message: 'Please input Main Actor!' }]}
          >
            <Input maxLength={10} />
          </Form.Item>

          <Form.Item label='Rating' name='rating'>
            <Rate
              tooltips={desc}
              onChange={setRatingValue}
              value={ratingValue}
            />
            {ratingValue ? (
              <span className='ant-rate-text'>{desc[ratingValue - 1]}</span>
            ) : (
              ''
            )}
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type='primary' htmlType='submit'>
              Add Movie
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});