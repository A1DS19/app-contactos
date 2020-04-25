const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route POST /api/contacts
//@desc regresa todos lo contactos de el usuario
//@acceso privado
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json({ contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

//@route POST /api/contacts
//@desc agrega contacto nuevo
//@acceso privado
router.post(
  '/',
  [auth, check('name', 'Porfavor ingrese nombre del contacto').not().isEmpty()],
  async (req, res) => {
    const { name, email, phone, type } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type,
      });

      const contact = await newContact.save();
      res.json({ contact });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    }
  }
);

//@route POST /api/contacts/id
//@desc modifica contacto nuevo por id
//@acceso privado
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contacto incorrecto' });

    //Revisar si id de user ligado a contacto es igual a user haciendo el request
    if (contact.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: 'Credenciales invalidas para realizar modificacion' });

    contact = await Contact.findOneAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );

    res.json({ contact });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

//@route POST /api/contacts/id
//@desc borra contacto nuevo por id
//@acceso privado
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contacto incorrecto' });

    //Revisar si id de user ligado a contacto es igual a user haciendo el request
    if (contact.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: 'Credenciales invalidas para realizar modificacion' });

    await Contact.findOneAndDelete(req.params.id);

    res.json({ msg: 'Contacto borrado' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});
module.exports = router;
