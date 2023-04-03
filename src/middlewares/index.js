const passport = require("passport");
const joi = require("joi");
module.exports = {
  isAuthenticated: (req, res, next) => {
    passport.authenticate("jwt", (err, user) => {
      if (err || !user) {
        res.status(403).send({
          error: "you shall not pass",
        });
      } else {
        req.user = user;
        next();
      }
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
        case "password":
          res.status(400).send({
            error:
              "you must have at least a special char, number, capital letter, small letter and it should be between 8-32 charecters",
          });

          break;
        default:
          res.status(400).send({ error: "invalid registration" });
      }
    } else {
      next();
    }
  },
};
