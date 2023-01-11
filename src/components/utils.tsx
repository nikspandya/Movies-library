import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { IMovieItem } from '../types/type';
import { movieStore } from '../store/MovieStore';

const handleDelete = (record: IMovieItem): void => {
  movieStore.deleteMovie(record.id);
  message.success(`Movie '${record.name}' deleted successfully`);
};

const handleEdit = (record: IMovieItem): void => {
  movieStore.setMovieDetails(record);
  movieStore.setIsMovieBeingEdited(true);
  console.log(record.id);
};

export const tableColumns: ColumnsType<IMovieItem> = [
  {
    title: 'Movie Name',
    dataIndex: 'name',
    // sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Movie Duration',
    dataIndex: 'duration',
    sorter: (a, b) => a.duration.localeCompare(b.duration),
  },
  {
    title: 'Release Date',
    dataIndex: 'releaseDate',
    sorter: (a, b) =>
      moment(a.releaseDate).unix() - moment(b.releaseDate).unix(),
  },
  {
    title: 'Main Actor',
    dataIndex: 'actor',
    sorter: (a, b) => a.actor.localeCompare(b.actor),
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    sorter: {
      compare: (a, b) => a.rating - b.rating,
      multiple: 3,
    },
  },
  {
    title: 'Action',
    render: (_, record) => (
      <>
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={(): void => handleEdit(record)}
        />

        <Popconfirm
          placement='topRight'
          title={(
            <p>
              Are you sure you want to delete &quot;
              <strong>{record.name}</strong>
              &quot;
            </p>
          )}
          onConfirm={(): void => handleDelete(record)}
          okText='Yes'
          cancelText='No'
        >
          <Button
            type='text'
            title='Delete Entry'
            icon={<DeleteOutlined style={{ color: 'red' }} />}
          />
        </Popconfirm>
      </>
    ),
  },
];

export const getDateFormat = (date: string, time?: boolean): string => {
  return new Date(date).toLocaleString('de-DE', {
    dateStyle: 'medium',
    timeStyle: time ? 'short' : undefined,
  });
};