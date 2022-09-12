const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.body.token;

  if (!token)
    return res.status(404).json({
      code: 404,
      status: 'Not Found',
      message: 'access denied',
    });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.validUser = verified;
    next();
  } catch (err) {
    res.status(401).json({
      code: 401,
      status: 'Unauthorized',
      message: 'invalid token',
    });
  }
};
