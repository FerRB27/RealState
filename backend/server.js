const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//servidor http
const app = express();
//Configuraciones servidor http
app.use(bodyParser.json());
app.use(cors());

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/real-state').then(() => {
    console.log('Conectado a la base de datos MongoDB');
}).catch((err) => {
    console.error('Error al conectar a la base de datos MongoDB', err);
});

//Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//configurar puerto para backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});