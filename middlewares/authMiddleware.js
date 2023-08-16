const jwt = require('jsonwebtoken')
const { User } = require("../db/models/usersModel");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res
      .status(401)
      .json({
        error: "Please, provide a token in request authorization header",
      });

  try {
    const [, token] = authorization.split(" ");
    const isUserLoggedIn = await User.findOne({ token });

    if (!isUserLoggedIn)
      return res.status(401).json({ error: "You are not logged in!" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken.id });

    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};