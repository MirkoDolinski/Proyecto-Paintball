const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario_mysql',
    password: 'tu_contraseña_mysql',
    database: 'paintball_reservas'
});

// Conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.use(express.static('public'));

// Nueva ruta para consultar reservas por usuario
app.get('/consultar-reservas', (req, res) => {
    const usuario = req.query.usuario;

    // Consulta a la base de datos
    const query = `SELECT * FROM reservas WHERE usuario = ?`;
    connection.query(query, [usuario], (error, results) => {
        if (error) {
            console.error('Error al consultar las reservas:', error);
            res.status(500).send('Error al consultar las reservas');
            return;
        }

        res.json({ reservas: results });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
