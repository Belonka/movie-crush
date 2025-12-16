export const typeDefs = `#graphql
    type FavoriteMovie {       
        movieId: Int!
        title: String!
        poster_path: String!
        release_date: String
}

    type Movie {
        id: ID
        title: String
        poster_path: String
        release_date: String
        overview: String
        vote_average: Float
    }
             
     type Query {
         favorites:[FavoriteMovie!]!
         genres: [Genre]
         getMovies(page: Int!): [Movie]
         getMoviesByGenre(genreId: ID!, page: Int!): [Movie]
     } 

     type Mutation {
        addMovie(movieId: ID!,title: String!, poster_path: String!, release_date: String ): FavoriteMovie!
        deleteMovie(movieId: ID!): String
        
     }
     type Genre {
        id: ID
        name: String
        }

       
`