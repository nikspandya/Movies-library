import { Modal, Form, Input, DatePicker, Button, Rate, message } from 'antd';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import { movieStore } from '../store/MovieStore';
import { getDateFormat } from './utils';

export const EditMovieComponent = observer(() => {

  const [form] = Form.useForm();
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const handleCancel = (): void => {
    movieStore.setIsMovieBeingEdited(false);
  };

  const onFinish = (values: any): void => {
    console.log('Success:', values);
    const movieDate = getDateFormat(values.releaseDate.toDate());
    movieStore.updateMovie(
      values.movieName,
      values.duration,
      movieDate,
      values.actor,
    );
    form.resetFields();
    movieStore.setIsMovieBeingEdited(false);
    message.success(`Movie '${values.movieName}' edited successfully`);
  };

  const onFinishFailed = (errorInfo: any): void => {
    message.error('falied to edit Movie');
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title='Edit Movie'
        open={movieStore.isMovieBeingEdited}
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
            initialValue={movieStore.movieDetails.name}
            rules={[{ required: true, message: 'Please input Movie Name!' }]}
          >
            <Input maxLength={10} />
          </Form.Item>

          <Form.Item
            label='Duration'
            name='duration'
            initialValue={movieStore.movieDetails.duration}
            rules={[
              { required: true, message: 'Please input Movie Duration!' },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>

          <Form.Item
            label='Release Date'
            name='releaseDate'
            initialValue={moment(
              movieStore.movieDetails.releaseDate,
              'DD.MM.YYYY',
            )}
            rules={[{ required: true, message: 'Please input Release Date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label='Actor'
            name='actor'
            initialValue={movieStore.movieDetails.actor}
            rules={[{ required: true, message: 'Please input Actor!' }]}
          >
            <Input maxLength={10} />
          </Form.Item>

          <Form.Item label='Rating' name='rating'>
            <Rate
              tooltips={desc}
              disabled
              defaultValue={movieStore.movieDetails.rating}
            />
            {movieStore.movieDetails.rating ? (
              <span className='ant-rate-text'>
                {desc[movieStore.movieDetails.rating - 1]}
              </span>
            ) : (
              ''
            )}
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type='primary' htmlType='submit'>
              Edit Movie
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});