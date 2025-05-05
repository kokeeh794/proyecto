document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registro-form');
    const formularioRegistro = document.getElementById('formulario-registro');
    const perfilUsuario = document.getElementById('perfil-usuario');
    
    // Verificar si hay datos de usuario en localStorage
    const usuarioRegistrado = localStorage.getItem('usuarioAlgeGym');
    
    if (usuarioRegistrado) {
      // Mostrar perfil si el usuario ya está registrado
      mostrarPerfil(JSON.parse(usuarioRegistrado));
      formularioRegistro.style.display = 'none';
      perfilUsuario.style.display = 'block';
    } else {
      // Mostrar formulario si no hay usuario registrado
      formularioRegistro.style.display = 'block';
      perfilUsuario.style.display = 'none';
    }
  
    // Manejar el envío del formulario
    registroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar contraseñas
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      // Crear objeto con los datos del usuario
      const usuario = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fechaNacimiento: document.getElementById('fecha-nacimiento').value,
        plan: document.getElementById('plan').value,
        fechaRegistro: new Date().toLocaleDateString()
      };
      
      // Guardar en localStorage (simulando base de datos)
      localStorage.setItem('usuarioAlgeGym', JSON.stringify(usuario));
      
      // Mostrar perfil y ocultar formulario
      mostrarPerfil(usuario);
      formularioRegistro.style.display = 'none';
      perfilUsuario.style.display = 'block';
      
      // Mostrar mensaje de éxito
      alert('¡Registro exitoso! Bienvenido a AlgeGym');
    });
  
    // Función para mostrar los datos del perfil
    function mostrarPerfil(usuario) {
      document.getElementById('nombre-usuario').textContent = usuario.nombre;
      document.getElementById('nombre-completo').textContent = `${usuario.nombre} ${usuario.apellidos}`;
      document.getElementById('email-usuario').textContent = usuario.email;
      document.getElementById('telefono-usuario').textContent = usuario.telefono || 'No especificado';
      document.getElementById('nacimiento-usuario').textContent = new Date(usuario.fechaNacimiento).toLocaleDateString('es-ES');
      document.getElementById('miembro-desde').textContent = `Miembro desde: ${usuario.fechaRegistro}`;
      
      // Mostrar el plan según la selección
      let planTexto = '';
      switch(usuario.plan) {
        case 'individual':
          planTexto = 'Plan Individual (30,90€/mes)';
          break;
        case 'pareja':
          planTexto = 'Plan Pareja (44,90€/mes)';
          break;
        case 'familiar':
          planTexto = 'Plan Familiar (57,90€/mes)';
          break;
        case 'jubilado':
          planTexto = 'Plan Jubilado (22,90€/mes)';
          break;
        default:
          planTexto = 'Plan no especificado';
      }
      
      document.getElementById('plan-usuario').textContent = planTexto;
      document.getElementById('membresia-plan').textContent = planTexto;
      
      // Calcular próximo pago (30 días después del registro)
      const fechaRegistro = new Date();
      const proximoPago = new Date(fechaRegistro.setDate(fechaRegistro.getDate() + 30));
      document.getElementById('membresia-pago').textContent = proximoPago.toLocaleDateString('es-ES');
    }
  
    // Botón de cerrar sesión
    const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');
    if (btnCerrarSesion) {
      btnCerrarSesion.addEventListener('click', function() {
        localStorage.removeItem('usuarioAlgeGym');
        location.reload();
      });
    }
  
    // Botón de editar perfil
    const btnEditar = document.querySelector('.btn-editar');
    if (btnEditar) {
      btnEditar.addEventListener('click', function() {
        formularioRegistro.style.display = 'block';
        perfilUsuario.style.display = 'none';
        
        // Cargar datos en el formulario
        const usuario = JSON.parse(localStorage.getItem('usuarioAlgeGym'));
        if (usuario) {
          document.getElementById('nombre').value = usuario.nombre;
          document.getElementById('apellidos').value = usuario.apellidos;
          document.getElementById('email').value = usuario.email;
          document.getElementById('telefono').value = usuario.telefono;
          document.getElementById('fecha-nacimiento').value = usuario.fechaNacimiento;
          document.getElementById('plan').value = usuario.plan;
        }
      });
    }
  });
  