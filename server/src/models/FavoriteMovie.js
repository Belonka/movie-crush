import mongoose from "mongoose";

const favoriteMovieSchema = new mongoose.Schema({
    movieId: String,
    title: String,
    poster_path: String,
    release_date: String
  });
  
  export default mongoose.model("FavoriteMovie", favoriteMovieSchema);