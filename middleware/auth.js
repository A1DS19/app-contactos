const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Recibe token
  const token = req.header('x-auth-token');

  //Si token no existe
  if (!token) {
    return res.status(401).json({ msg: 'Token no existe, acceso invalido' });
  }

  //Si es que existe verifica el token
  try {
    const decoded = jwt.verify(token, config.get('secretJWT'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no es valido' });
  }
};
