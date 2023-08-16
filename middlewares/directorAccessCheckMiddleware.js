const directorAccessCheckMiddleware = (req, res, next) => {
  const { subscription: role } = req.user;
  if (role !== "director") {
    return res
      .status(403)
      .json("Only the director has the right to this information!");
  }
  next();
};

module.exports = { directorAccessCheckMiddleware };
