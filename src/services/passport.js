const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const config = require("../config/config");
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById (jwtPayload._id);
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      } catch (error) {
        return done(new Error(), false);
      }
    }
  )
);
module.exports = null;
