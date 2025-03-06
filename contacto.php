<?php
// contacto.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizar y validar los datos recibidos
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $asunto = filter_input(INPUT_POST, 'asunto', FILTER_SANITIZE_STRING);
    $mensaje = filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_STRING);

    if (!$nombre || !$email || !$asunto || !$mensaje) {
        echo "Por favor, complete todos los campos.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El email no es válido.";
        exit;
    }

    // Configuración del correo (ajustar según su configuración)
    $destinatario = "tu-email@ejemplo.com"; // Reemplazar por el email real de destino
    $cabeceras = "From: $nombre <$email>" . "\r\n" .
                 "Reply-To: $email" . "\r\n" .
                 "X-Mailer: PHP/" . phpversion();

    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Asunto: $asunto\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";

    // Enviar el correo
    if (mail($destinatario, $asunto, $cuerpo, $cabeceras)) {
        echo "El mensaje se ha enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
} else {
    echo "Método no permitido.";
}
?>
