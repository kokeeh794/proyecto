<?php
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST["nombre"] ?? "";
    $apellidos = $_POST["apellidos"] ?? "";
    $email = $_POST["email"] ?? "";
    $telefono = $_POST["telefono"] ?? "";
    $fecha_nacimiento = $_POST["fecha-nacimiento"] ?? "";
    $plan = $_POST["plan"] ?? "";
    $password = $_POST["password"] ?? "";
    $confirm_password = $_POST["confirm-password"] ?? "";

    if ($password !== $confirm_password) {
        echo "<script>alert('Las contraseñas no coinciden'); window.location.href = 'usuario.html';</script>";
        exit();
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO usuarios 
                (nombre, apellidos, email, telefono, fecha_nacimiento, plan, password) 
                VALUES 
                (:nombre, :apellidos, :email, :telefono, :fecha_nacimiento, :plan, :password)";
        
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':fecha_nacimiento', $fecha_nacimiento);
        $stmt->bindParam(':plan', $plan);
        $stmt->bindParam(':password', $passwordHash);

        $stmt->execute();

        echo "<script>alert('Registro exitoso'); window.location.href = 'usuario.html';</script>";
        exit();

    } catch (PDOException $e) {
        echo "<script>alert('Error en la base de datos: " . $e->getMessage() . "'); window.location.href = 'usuario.html';</script>";
        exit();
    }
} else {
    header("Location: usuario.html");
    exit();
}
?>
