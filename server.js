const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;  

// Middleware
app.use(express.static('public'));  
app.use(bodyParser.json());

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paintball_reservas'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ruta para consultar todas las reservas
app.get('/reservas', (req, res) => {
    const query = 'SELECT * FROM reservas';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar las reservas:', err);
            res.status(500).send('Error al consultar las reservas');
            return;
        }
        res.json(results);
    });
});

// Ruta para crear una nueva reserva
app.post('/nueva-reserva', (req, res) => {
    const { name, email, phone, date, time, players } = req.body;
    const query = 'INSERT INTO reservas (name, email, phone, date, time, players) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [name, email, phone, date, time, players], (err) => {
        if (err) {
            console.error('Error al crear la reserva:', err);
            res.status(500).send('Error al crear la reserva');
            return;
        }
        res.sendStatus(201);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
