const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

//@route GET /api/auth
//@desc GET usuario loggeado
//@acceso privado
router.get('/', (req, res) => {
  res.send('GET usuario loggeado');
});

//@route POST /api/auth
//@desc Loggea nuevo usuario con token
//@acceso publico
router.post(
  '/',
  [
    check('email', 'Credenciales invalidas').isEmail(),
    check('password', 'Credenciales invalidas').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Credenciales invalidas' });
      }
      const passMatch = await bcrypt.compare(password, user.password);

      if (!passMatch) {
        return res.status(400).json({ msg: 'Credenciales invalidas' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('secretJWT'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Error del servidor');
    }
  }
);

module.exports = router;
