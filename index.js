const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();
const path = require("path");
// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
// app.use( express.json() );

//Se agregaron las siguientes dos lineas para detener el error '413 payload too large', la linea original es la de arriba
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );
app.use('/api/users', require('./routes/users') );
app.use('/api/areas', require('./routes/areas') );
app.use('/api/reservas', require('./routes/reservas') );
app.use('/api/login', require('./routes/login') );
app.use('/api/apk', require('./routes/apk') );

app.get('/page', (req, res) => {
    res.sendFile(path.join(__dirname + "/html/index.html"))
});


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});






