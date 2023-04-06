const jwt = require("jsonwebtoken");

// Verify Token Function

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    jwt.verify(bearerToken, "super secret", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userId = authData._id;
      }
    });

    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = { verifyToken };
