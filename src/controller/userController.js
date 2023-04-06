const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { User } = require("../models");
const MovieData = require("../models/Movies");
function jwtSignUser(user) {
  const oneDay = 60 * 60 * 24;
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: oneDay,
  });
}

module.exports = {
  findByID: (req, res) => {
    const { user } = req;
    if (!user) {
      return res
        .status(400)
        .send({ error: "server is having an issue please try again later" });
    }
    return res.json(user);
  },

  async signup(req, res) {
    try {
      const user = new User(req.body);
      const userToObjson = user.toJSON();
      await user.save();

      return res.send({ user: userToObjson });
    } catch (error) {
      console.error(error);

      return res.status(400).send({ error: error.message });
    }
  },
  async addToWatchList(req, res) {
    // same as remove function , using findoneanddelete sending the id user.
    try {
      const { poster_path, title, release_date, movieId, userId } = req.body;

      const movie = await MovieData.findOne({
        userId: userId,
        movieId: movieId,
      });
      console.log(userId, movieId, movie);
      if (movie) {
        return res.status(400).json({
          error: "Movie with same movieId already exists in watchlist.",
        });
      }

      const newMovie = new MovieData({
        poster_path,
        title,
        release_date,
        movieId,
        userId,
      });
      await newMovie.save();
      res.status(201).json({ message: "Movie added to watchlist." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error adding movie to watchlist." });
    }
  },
  async getWatchedList(req, res) {
    try {
      const userId = req.query.userId;

      const watchedList = await MovieData.find({
        userId: userId,
      });

      res.send(watchedList);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("An error occurred while fetching the watched list.");
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(403)
          .send({ error: "the login information is wrong" });
      }
      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        return res
          .status(403)
          .send({ error: "the login information is wrong" });
      }

      return res.send({
        user,
        token: jwtSignUser({ user }),
      });
    } catch (error) {
      console.log(error);
      console.log("error.message :>> ", error.message);
      return res.status(500).send({ error: error.message });
    }
  },
};
