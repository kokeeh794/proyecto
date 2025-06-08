<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    $modo = $_POST["modo"] ?? "registro";

    if ($password !== $confirm_password) {
        echo "<script>
            alert('Las contraseñas no coinciden');
            window.location.href = 'usuario.html';
        </script>";
        exit();
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $fechaRegistro = date("d/m/Y");
    $bonos = empty($plan) ? 0 : 30;

    try {
        if ($modo === "editar") {
            // Actualizar todos los campos excepto el email
            $sql = "UPDATE usuarios SET 
                        nombre = :nombre,
                        apellidos = :apellidos,
                        telefono = :telefono,
                        fecha_nacimiento = :fecha_nacimiento,
                        plan = :plan,
                        password = :password
                    WHERE email = :email";
        } else {
            // Insertar nuevo usuario
            $sql = "INSERT INTO usuarios 
                        (nombre, apellidos, email, telefono, fecha_nacimiento, plan, password)
                    VALUES 
                        (:nombre, :apellidos, :email, :telefono, :fecha_nacimiento, :plan, :password)";
        }

        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':fecha_nacimiento', $fecha_nacimiento);
        $stmt->bindParam(':plan', $plan);
        $stmt->bindParam(':password', $passwordHash);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        // Mensaje personalizado según el modo
        $mensaje = ($modo === "editar") ? "Datos actualizados correctamente" : "¡Bienvenido a AlgeGym!";

        // Guardar datos en localStorage y redirigir
        echo "<script>
            const usuario = {
                nombre: " . json_encode($nombre) . ",
                apellidos: " . json_encode($apellidos) . ",
                email: " . json_encode($email) . ",
                telefono: " . json_encode($telefono) . ",
                fechaNacimiento: " . json_encode($fecha_nacimiento) . ",
                plan: " . json_encode($plan) . ",
                fechaRegistro: " . json_encode($fechaRegistro) . ",
                bonos: " . $bonos . "
            };

            localStorage.setItem('usuarioAlgeGym', JSON.stringify(usuario));
            alert(" . json_encode($mensaje) . ");
            window.location.href = 'usuario.html';
        </script>";
        exit();

    } catch (PDOException $e) {
        echo "<script>
            alert('Error en la base de datos: " . $e->getMessage() . "');
            window.location.href = 'usuario.html';
        </script>";
        exit();
    }
} else {
    header("Location: usuario.html");
    exit();
}
?>
