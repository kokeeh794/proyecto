<?php
require_once "config.php";
session_start();

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'No has iniciado sesión']);
    exit();
}

$id = $_SESSION['usuario_id'];

$stmt = $conexion->prepare("SELECT nombre, apellidos, email, telefono, fecha_nacimiento, plan FROM usuarios WHERE id = :id");
$stmt->execute([':id' => $id]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($usuario);
?>
