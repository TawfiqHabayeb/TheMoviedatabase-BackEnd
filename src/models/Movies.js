const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    userId: { type: String },
    movieId: { type: String, required: true },
    poster_path: { type: String, required: true },
    title: { type: String, required: true },
    release_date: { type: String, required: true },
  },
  {
    collection: "movies",
  }
);

const movie = mongoose.model("MovieData", movieSchema);
module.exports = movie;
