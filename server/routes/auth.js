module.exports.isAuth = (req, res, next) => {
  if (req.session.token) return next();

  res.status(400).send({ success: false });
};
