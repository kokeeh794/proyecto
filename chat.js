function enviarMensaje() {
    const userInput = document.getElementById("userInput");
    const chatMessages = document.getElementById("chatMessages");
    const mensaje = userInput.value.trim().toLowerCase();
  
    if (mensaje !== "") {
      const userMessage = document.createElement("div");
      userMessage.innerHTML = `<strong>Tú:</strong> ${userInput.value}`;
      chatMessages.appendChild(userMessage);
  
      setTimeout(() => {
        const respuesta = generarRespuesta(mensaje);
        const aiMessage = document.createElement("div");
        aiMessage.innerHTML = `<strong>IA:</strong> ${respuesta}`;
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 800);
  
      userInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
  
  function generarRespuesta(mensaje) {
    if (mensaje.includes("horario") || mensaje.includes("hora")) {
      return "Nuestro horario es de lunes a viernes de 7:00 a 22:00, sábados de 9:00 a 14:00.";
    }
    if (mensaje.includes("precio") || mensaje.includes("cuanto cuesta") || mensaje.includes("plan")) {
      return "Puedes consultar nuestros planes en la sección 'Planes'. Tenemos opciones desde 25€/mes.";
    }
    if (mensaje.includes("ubicacion") || mensaje.includes("donde esta") || mensaje.includes("dirección")) {
      return "Estamos ubicados en Algeciras, puedes ver el mapa en la sección 'Contacto'.";
    }
    if (mensaje.includes("entrenador") || mensaje.includes("personal")) {
      return "Sí, contamos con entrenadores personales. Consulta la sección 'Información' para más detalles.";
    }
    if (mensaje.includes("clases") || mensaje.includes("actividad") || mensaje.includes("zumba") || mensaje.includes("spinning")) {
      return "Ofrecemos actividades como zumba, spinning, pilates, y más. Consulta el horario de clases.";
    }
    if (mensaje.includes("gracias") || mensaje.includes("ok") || mensaje.includes("vale")) {
      return "¡De nada! Si necesitas más ayuda, aquí estoy.";
    }
    if (mensaje.includes("wifi") || mensaje.includes("internet")) {
      return "Sí, contamos con Wi-Fi gratuito para todos nuestros miembros.";
    }
    if (mensaje.includes("baño") || mensaje.includes("vestuario")) {
      return "Disponemos de vestuarios y baños en el gimnasio para tu comodidad.";
    }
    if (mensaje.includes("cancelar") || mensaje.includes("suspender")) {
      return "Para cancelar o suspender tu suscripción, por favor, contacta con nuestro equipo en la sección 'Contacto'.";
    }
    if (mensaje.includes("acceso") || mensaje.includes("entrada")) {
      return "El acceso al gimnasio está disponible con tu tarjeta de miembro durante el horario de apertura.";
    }
    if (mensaje.includes("medidas de seguridad") || mensaje.includes("covid")) {
      return "Seguimos todas las normativas de seguridad e higiene. Asegúrate de usar la mascarilla en espacios cerrados.";
    }
    if (mensaje.includes("actividades infantiles") || mensaje.includes("niños")) {
      return "Contamos con actividades infantiles como natación, deportes y juegos. Consulta el horario en 'Planes'.";
    }
    if (mensaje.includes("material") || mensaje.includes("equipamiento")) {
      return "Disponemos de material y equipamiento de alta calidad para todas nuestras actividades.";
    }
    if (mensaje.includes("horario de clases") || mensaje.includes("clases")) {
      return "Consulta el horario de clases en la sección 'Clases' de nuestra web para más detalles.";
    }
    if (mensaje.includes("precios") || mensaje.includes("ofertas")) {
      return "Las ofertas y precios actuales están disponibles en la sección 'Planes'. No dudes en echar un vistazo.";
    }
    if (mensaje.includes("pago") || mensaje.includes("factura")) {
      return "Puedes realizar tu pago a través de la plataforma online o en nuestra recepción. Para más detalles, visita la sección 'Pago'.";
    }
    if (mensaje.includes("estacionamiento") || mensaje.includes("aparcamiento")) {
      return "Tenemos un aparcamiento gratuito disponible para nuestros miembros durante el horario de apertura.";
    }
    if (mensaje.includes("cuánto tiempo") || mensaje.includes("duracion")) {
      return "La duración de las clases varía según la actividad, generalmente entre 45 y 90 minutos.";
    }
   
    return "No entendí muy bien tu consulta. ¿Podrías reformularla o ser más específico?";
  }
  