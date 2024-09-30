<?php
// Mostrar errores de PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'paintball_reservas'; // Cambia esto si es necesario
$username = 'root'; // Cambia esto si es necesario
$password = ''; // Cambia esto si es necesario

// Crear una conexión a la base de datos
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo 'Error de conexión: ' . $conn->connect_error;
    exit;
}

// Obtener los datos del formulario
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$players = $_POST['players'] ?? '';
$location = $_POST['location'] ?? '';

// Verificar que todos los campos estén presentes
if (empty($name) || empty($email) || empty($phone) || empty($date) || empty($time) || empty($players) || empty($location)) {
    http_response_code(400); // Bad Request
    echo 'Todos los campos son obligatorios.';
    exit;
}

// Preparar la consulta SQL
$sql = "INSERT INTO reservas (name, email, phone, date, time, players, location) VALUES (?, ?, ?, ?, ?, ?, ?)";

// Preparar la declaración
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    echo 'Error en la preparación de la consulta: ' . $conn->error;
    exit;
}

// Vincular parámetros
$stmt->bind_param('sssssis', $name, $email, $phone, $date, $time, $players, $sede);

// Ejecutar la declaración
if ($stmt->execute()) {
    http_response_code(200); // OK
    echo 'Reserva creada exitosamente.';
} else {
    http_response_code(500); // Internal Server Error
    echo 'Error al crear la reserva: ' . $stmt->error;
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();

