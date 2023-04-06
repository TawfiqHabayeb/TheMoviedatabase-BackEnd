const passport = require("passport");
const joi = require("joi");
module.exports = {
  isAuthenticated: (req, res, next) => {
    passport.authenticate("jwt", (err, user) => {
      if (err || !user) {
        return res.status(403).send({
          error: "you shall not pass",
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  signup: (req, res, next) => {
    const schema = joi.object({
      username: joi.string().email(),
      password: joi.string(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error.details[0].context);
      switch (error.details[0].context.key) {
        case "username":
          res.status(400).send({ error: "invalid email" });

          break;
        default:
          res.status(400).send({ error: "invalid registration" });
      }
    } else {
      next();
    }
  },
};
