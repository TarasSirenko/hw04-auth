const checkUserNotClientMiddleware = (req, res, next) => {
  const { subscription: role } = req.user;
  if (role === "client") {
    return res
      .status(403)
      .json("Client has no right to request this information");
  }
  next();
};

module.exports = { checkUserNotClientMiddleware };
