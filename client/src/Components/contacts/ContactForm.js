import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      SetContact(current);
    } else {
      SetContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, SetContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    SetContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current == null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    SetContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current == null ? 'Agregar Contacto' : 'Editar Contacto'}
      </h2>
      <input
        type='text'
        name='name'
        value={name}
        placeholder='Nombre'
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        value={email}
        placeholder='Email'
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        value={phone}
        placeholder='Numero Telefonico'
        onChange={onChange}
      />
      <h5>Tipo de Contacto</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Profesional
      <div>
        <input
          type='submit'
          value={current == null ? 'Agregar Contacto' : 'Editar Contacto'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current != null ? (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Limpiar
          </button>
        </div>
      ) : null}
    </form>
  );
};

export default ContactForm;
