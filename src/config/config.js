const mongoose = require("mongoose");

module.exports = {
  db: {
    mongoURL: process.env.MONGODB_URL || "mongodb://localhost:27017/node-auth",
  },
  jwtSecret: process.env.JWT_SECRET || "super secret",
};

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/node-auth")
  .then(() => {
    console.log("connected to mongodb");
  })

  .catch((error) => {
    console.log("error :>> ", error);
  });
