import { makeAutoObservable } from 'mobx';
import { IMovieItem } from '../types/type';

class MovieStore {
  movieDetails: IMovieItem = {} as IMovieItem;

  isMovieBeingEdited: boolean = false;

  movies: IMovieItem[] = [
    {
      id: 2,
      name: 'Batman',
      rating: 4,
      releaseDate: '15.05.2005',
      duration: '3 Hours',
      actor: 'Bruce Wayne',
    },
    {
      id: 3,
      name: 'Spider Man',
      rating: 3,
      releaseDate: '14.06.2010',
      duration: '2.5 Hours',
      actor: 'Peter Parker',
    },
    {
      id: 4,
      name: 'Iron Man',
      rating: 5,
      releaseDate: '15.07.2015',
      duration: '2 Hours',
      actor: 'Tony Stark',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setIsMovieBeingEdited = (isMovieBeingEdited: boolean): void => {
    this.isMovieBeingEdited = isMovieBeingEdited;
  };

  setMovieDetails = (movieDetails: IMovieItem): void => {
    this.movieDetails = movieDetails;
  };

  addMovie(
    name: string,
    duration: string,
    releaseDate: string,
    rating: number,
    actor: string,
  ): void {
    const item: IMovieItem = {
      // Generate random number between 5 to 5000
      id: Math.random() * (5000 - 5) + 5,
      name,
      duration,
      releaseDate,
      rating,
      actor,
    };
    this.movies.push(item);
  }

  updateMovie(
    movieName: string,
    duration: string,
    releaseDate: string,
    actor: string,
  ): void {
    const updatedMovie = this.movies.findIndex(
      (obj) => obj.id == this.movieDetails.id,
    );
    this.movies[updatedMovie].name = movieName;
    this.movies[updatedMovie].duration = duration;
    this.movies[updatedMovie].releaseDate = releaseDate;
    this.movies[updatedMovie].actor = actor;
  }

  deleteMovie(id: number): void {
    // Delete the movie item by selected movie id
    const index = this.movies.findIndex((item) => item.id === id);
    if (index > -1) this.movies.splice(index, 1);
  }
}

export const movieStore = new MovieStore();