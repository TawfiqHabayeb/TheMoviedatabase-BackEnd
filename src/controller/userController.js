const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { User } = require("../models");

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
      const userToObjson = user.toJSON();
      return res.send({
        user: userToObjson,
        token: jwtSignUser(userToObjson),
      });
    } catch (error) {
       console.log(error);
      return res.status(500).send({ error: "we have an error" });
    }
  },
};
