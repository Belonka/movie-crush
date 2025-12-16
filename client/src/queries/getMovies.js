import { gql} from '@apollo/client'

export const GET_MOVIES = gql`
  query GetMovies($page: Int!) {
    getMovies(page: $page) {
      id
      title
      poster_path
      release_date
      vote_average
    }
  }
`;

export const GET_MOVIES_BY_GENRE = gql`
  query GetMoviesByGenre($genreId: ID!, $page: Int!) {
    getMoviesByGenre(genreId: $genreId, page: $page) {
      id
      title
      poster_path
      release_date
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie(
    $movieId: ID!
    $title: String!
    $poster_path: String!
    $release_date: String
  ) {
    addMovie(
      movieId: $movieId
      title: $title
      poster_path: $poster_path
      release_date: $release_date
    ) {
      movieId
      title
      poster_path
      release_date
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: ID!) {
    deleteMovie(movieId: $movieId)
  }
`;