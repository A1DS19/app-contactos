const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/DB');

//Conexion Base de Datos
connectDB();

//Middleware init
app.use(express.json({ extended: false }));

//Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`SERVER INICIADO\nPUERTO ${PORT}`));
