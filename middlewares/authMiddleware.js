const jwt = require('jsonwebtoken')
const { Users } = require("../db/models/usersModel");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    next( new Error("Please, provide a token in request authorization header"))
  try {
    const [, token] = authorization.split(" ");

    console.log(token);
    const isUserLogin = await Users.findOne({ token });
      if (!isUserLogin) throw new Error("You are not logged in!");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ _id: decodedToken.id });
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
