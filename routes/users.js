const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

//@route POST /api/users
//@desc Registra nuevo usuario
//@acceso publico
router.post(
  '/',
  [
    check('name', 'Porfavor ingrese un nombre').not().isEmpty(),
    check('email', 'Porfavor ingrese un email valido').isEmail(),
    check(
      'password',
      'Porfavor ingrese un contrasena correcta de 6 caracteres o mas'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: 'Email ya existe' });
      }

      user = new User({
        name,
        email,
        password,
      });

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          if (err) {
            res.status(500).send(err);
          } else {
            res.json({ token });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  }
);

module.exports = router;
