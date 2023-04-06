const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    userId: { type: String },
    movieId: { type: String, required: true, unique: false },
    poster_path: { type: String, required: true, unique: false },
    title: { type: String, required: true, unique: false },
    release_date: { type: String, required: true, unique: false },
  },
  {
    collection: "movies",
  }
);

const movie = mongoose.model("MovieData", movieSchema);
module.exports = movie;

// {each user will have an array of addtowatchedlist } {fetch array watchedlistarray from userdata, }
//{for each id in the movielistarray fetch the movie details}
//{show movies}
