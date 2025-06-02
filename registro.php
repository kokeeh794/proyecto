<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $nombre = $_POST['nombre'];
  $apellidos = $_POST['apellidos'];
  $email = $_POST['email'];
  $telefono = $_POST['telefono'];
  $fecha = $_POST['fecha-nacimiento'];
  $plan = $_POST['plan'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO usuarios (nombre, apellidos, email, telefono, fecha_nacimiento, plan, password)
          VALUES (?, ?, ?, ?, ?, ?, ?)";

  $stmt = $conn->prepare($sql);
  $stmt->execute([$nombre, $apellidos, $email, $telefono, $fecha, $plan, $password]);

  echo "Usuario registrado correctamente.";
}
?>
