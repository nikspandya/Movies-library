import type { NextPage } from 'next';
import React from 'react';
import { MovieComponent } from '../components/MovieComponent';

const Home: NextPage = () => {
  return (
    <div>
      <MovieComponent />
    </div>
  );
};

export default Home;