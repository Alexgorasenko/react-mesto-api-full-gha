const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  console.log(jwt.verify(token, 'super_strong_password'));
  let payload;
  if (!token) {
    next(new UnauthorizedError('Неверный логин или пароль 1'));
  }
  try {
    payload = jwt.verify(token, 'super_strong_password');
  } catch (err) {
    next(new UnauthorizedError('Неверный логин или пароль 2'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
