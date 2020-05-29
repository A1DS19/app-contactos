import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered == null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filtrar Contactos...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
