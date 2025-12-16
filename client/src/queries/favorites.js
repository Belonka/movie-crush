import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
  query {
    favorites {
      movieId
      title
      poster_path
      release_date
    }
  }
`;