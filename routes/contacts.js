const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const User = require('../models/User');

//@ROUTE GET api/contacts
//@DESC Get all users contacts
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.send(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

//@ROUTE POST api/contacts
//@DESC Post contact
//@access Private
router.post(
  '/',
  [
    auth,
    check('name', 'Porfavor ingrese un nombre para el contacto')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, phone, type } = req.body;

      const contact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type,
      });

      const newContact = await contact.save();

      res.json(newContact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  }
);

//@ROUTE PUT api/contacts/:id
//@DESC UPDATE  contact
//@access Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Objeto con los campos que se submitan
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contacto no existe' });

    //Seguridad a la hora de hacer cambios a contactos
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Acceso denegado' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

//@ROUTE DELETE api/contacts/:id
//@DESC Delete contact
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contacto no existe' });

    //Seguridad a la hora de hacer cambios a contactos
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Acceso denegado' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contacto eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
