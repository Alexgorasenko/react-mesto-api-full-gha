const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Неверный логин или пароль'));
  }
  try {
    payload = jwt.verify(token, 'super_strong_password');
  } catch (err) {
    next(new UnauthorizedError('Неверный логин или пароль'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
