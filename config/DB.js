const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`CONEXION A DB EXITOSA!`);
  } catch (err) {
    console.log(`ERROR CONEXION DB:\n${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
