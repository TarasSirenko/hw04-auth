const directorOrManagerAccessCheckMiddleware = (req, res, next) => {
  const { subscription: role } = req.user;
  if (role === "client" || role === "seller") {
    return res
      .status(403)
      .json("Client or seller has no right to request this information");
  }
  next();
};

module.exports = { directorOrManagerAccessCheckMiddleware };
