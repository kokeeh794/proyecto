document.addEventListener('DOMContentLoaded', function () {
  const registroForm = document.getElementById('registro-form');
  const formularioRegistro = document.getElementById('formulario-registro');
  const perfilUsuario = document.getElementById('perfil-usuario');
  const btnEditar = document.querySelector('.btn-editar');
  const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');

  const usuarioRegistrado = localStorage.getItem('usuarioAlgeGym');

  if (usuarioRegistrado) {
    const usuario = JSON.parse(usuarioRegistrado);
    mostrarPerfil(usuario);
    formularioRegistro.style.display = 'none';
    perfilUsuario.style.display = 'block';
  } else {
    formularioRegistro.style.display = 'block';
    perfilUsuario.style.display = 'none';
  }

  if (registroForm) {
    registroForm.addEventListener('submit', function (e) {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        e.preventDefault();
      }
    });
  }

  if (btnEditar) {
    btnEditar.addEventListener('click', function () {
      formularioRegistro.style.display = 'block';
      perfilUsuario.style.display = 'none';

      const usuario = JSON.parse(localStorage.getItem('usuarioAlgeGym'));
      if (usuario) {
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('apellidos').value = usuario.apellidos;
        document.getElementById('email').value = usuario.email;
        document.getElementById('telefono').value = usuario.telefono;
        document.getElementById('fecha-nacimiento').value = usuario.fechaNacimiento;
        document.getElementById('plan').value = usuario.plan;
        document.getElementById('modo-envio').value = "editar";
      }
    });
  }

  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', function () {
      localStorage.removeItem('usuarioAlgeGym');
      location.reload();
    });
  }

  function mostrarPerfil(usuario) {
    document.getElementById('nombre-usuario').textContent = usuario.nombre;
    document.getElementById('nombre-completo').textContent = `${usuario.nombre} ${usuario.apellidos}`;
    document.getElementById('email-usuario').textContent = usuario.email;
    document.getElementById('telefono-usuario').textContent = usuario.telefono;
    document.getElementById('nacimiento-usuario').textContent = new Date(usuario.fechaNacimiento).toLocaleDateString('es-ES');
    document.getElementById('plan-usuario').textContent = obtenerNombrePlan(usuario.plan);
    document.getElementById('miembro-desde').textContent = `Miembro desde: ${usuario.fechaRegistro}`;
    document.getElementById('membresia-plan').textContent = obtenerNombrePlan(usuario.plan);

    const fechaPago = new Date();
    fechaPago.setDate(fechaPago.getDate() + 30);
    document.getElementById('membresia-pago').textContent = fechaPago.toLocaleDateString('es-ES');
  }

  function obtenerNombrePlan(plan) {
    switch (plan) {
      case "pareja":
        return "Plan Pareja 44,90€/mes";
      case "familiar":
        return "Plan Familiar 57,90€/mes";
      case "jubilado":
        return "Plan Jubilados 22,90€/mes";
      default:
        return "Sin plan";
    }
  }
});
