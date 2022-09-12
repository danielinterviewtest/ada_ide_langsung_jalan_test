const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //check token available
  //token diambil dari cookies atau header
  //tapi, sbg contoh, token diambil dari req.body
  const token = req.body.token;
  if (!token)
    return res.status(404).json({
      code: 404,
      status: 'Not Found',
      message: 'access denied',
    });
  try {
    //validate token
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
