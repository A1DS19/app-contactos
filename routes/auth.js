const express = require('express');
const router = express.Router();

//@route GET /api/auth
//@desc GET usuario loggeado
//@acceso privado
router.get('/', (req, res) => {
  res.send('GET usuario loggeado');
});

//@route POST /api/auth
//@desc Loggea nuevo usuario con token
//@acceso publico
router.post('/', (req, res) => {
  res.send('Loggea nuevo usuario con token');
});

module.exports = router;
