<?php
try {
    $conexion = new PDO("mysql:host=localhost;dbname=algegym;charset=utf8", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
