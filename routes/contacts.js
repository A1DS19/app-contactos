const express = require('express');
const router = express.Router();

//@route POST /api/contacts
//@desc regresa todos lo contactos de el usuario
//@acceso privado
router.get('/', (req, res) => {
  res.send('regresa todos lo contactos de el usuario');
});

//@route POST /api/contacts
//@desc agrega contacto nuevo
//@acceso privado
router.post('/', (req, res) => {
  res.send('agrega contacto nuevo');
});

//@route POST /api/contacts/id
//@desc modifica contacto nuevo por id
//@acceso privado
router.put('/:id', (req, res) => {
  res.send('modifica contacto nuevo por id');
});

//@route POST /api/contacts/id
//@desc borra contacto nuevo por id
//@acceso privado
router.delete('/:id', (req, res) => {
  res.send('borra contacto nuevo por id');
});
module.exports = router;
