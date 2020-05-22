const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //GET token del header
  const token = req.header('x-auth-token');

  //Ver si token existe
  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};
