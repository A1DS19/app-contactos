import React from 'react';

const Footer = () => {
  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        textAlign: 'center',
      }}
      className='m-1'
    >
      {' '}
      <h3>Desarrollado por: Jose Padilla {new Date().getFullYear()}</h3>
    </div>
  );
};

export default Footer;
