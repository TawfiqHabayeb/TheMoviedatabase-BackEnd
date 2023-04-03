const express = require("express")
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const api = require("./routes");
const app = express();
require("./config/config");
app.use(cors());
require("./services/passport");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

const userRouter = require("./routes/userRoutes");
const { isAuthenticated } = require("./middlewares");

app.use("/", userRouter);

app.use(isAuthenticated);
module.exports = app;
