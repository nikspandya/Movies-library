import { Row, Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { IMovieItem } from '../types/type';
import { AddMovieComponent } from './AddMovieComponent';
import { movieStore } from '../store/MovieStore';
import { tableColumns } from './utils';
import { EditMovieComponent } from './EditMovieComponent';

export const MovieComponent = observer(() => {
  const tableData = movieStore.movies.map((movie: IMovieItem) => {
    return {
      id: movie.id,
      name: movie.name,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
      actor: movie.actor,
    } as IMovieItem;
  });

  const onChange: TableProps<IMovieItem>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Row style={{ marginBottom: 10 }}>
        <AddMovieComponent />
      </Row>
      <Row align='middle'>
        <Table
          columns={tableColumns}
          dataSource={tableData}
          onChange={onChange}
          locale={{
            emptyText: <p> There is currently no Movies to show</p>,
          }}
        />
      </Row>
      {movieStore.isMovieBeingEdited ? <EditMovieComponent /> : ''}
    </div>
  );
});