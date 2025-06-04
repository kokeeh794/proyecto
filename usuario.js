document.addEventListener('DOMContentLoaded', function () {
  const registroForm = document.getElementById('registro-form');
  const formularioRegistro = document.getElementById('formulario-registro');
  const perfilUsuario = document.getElementById('perfil-usuario');
  const usuarioRegistrado = localStorage.getItem('usuarioAlgeGym');

  if (usuarioRegistrado) {
    mostrarPerfil(JSON.parse(usuarioRegistrado));
    if (formularioRegistro) formularioRegistro.style.display = 'none';
    if (perfilUsuario) perfilUsuario.style.display = 'block';
  } else {
    if (formularioRegistro) formularioRegistro.style.display = 'block';
    if (perfilUsuario) perfilUsuario.style.display = 'none';
    if (window.location.pathname.includes('pago.html')) {
      window.location.href = 'usuario.html?redirect=pago.html';
      return;
    }
  }

  if (registroForm) {
    registroForm.addEventListener('submit', function (e) {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        e.preventDefault();
        return;
      }
      // No se bloquea el envío al servidor aquí.
    });
  }

  function mostrarPerfil(usuario) {
    const nombreUsuario = document.getElementById('nombre-usuario');
    const nombreCompleto = document.getElementById('nombre-completo');
    const emailUsuario = document.getElementById('email-usuario');
    const telefonoUsuario = document.getElementById('telefono-usuario');
    const nacimientoUsuario = document.getElementById('nacimiento-usuario');
    const miembroDesde = document.getElementById('miembro-desde');
    const planUsuario = document.getElementById('plan-usuario');
    const membresiaPlan = document.getElementById('membresia-plan');
    const membresiaPago = document.getElementById('membresia-pago');

    if (nombreUsuario) nombreUsuario.textContent = usuario.nombre;
    if (nombreCompleto) nombreCompleto.textContent = `${usuario.nombre} ${usuario.apellidos}`;
    if (emailUsuario) emailUsuario.textContent = usuario.email;
    if (telefonoUsuario) telefonoUsuario.textContent = usuario.telefono || '';
    if (nacimientoUsuario) nacimientoUsuario.textContent = new Date(usuario.fechaNacimiento).toLocaleDateString('es-ES');
    if (miembroDesde) miembroDesde.textContent = `Miembro desde: ${usuario.fechaRegistro}`;

    let planTexto = '';
    switch (usuario.plan) {
      case 'individual': planTexto = 'Plan Individual (30,90€/mes)'; break;
      case 'pareja': planTexto = 'Plan Pareja (44,90€/mes)'; break;
      case 'familiar': planTexto = 'Plan Familiar (57,90€/mes)'; break;
      case 'jubilado': planTexto = 'Plan Jubilado (22,90€/mes)'; break;
      default: planTexto = 'Plan no especificado';
    }

    if (planUsuario) planUsuario.textContent = planTexto;
    if (membresiaPlan) membresiaPlan.textContent = planTexto;

    const fechaRegistro = new Date();
    const proximoPago = new Date(fechaRegistro.setDate(fechaRegistro.getDate() + 30));
    if (membresiaPago) membresiaPago.textContent = proximoPago.toLocaleDateString('es-ES');
  }

  const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', function () {
      localStorage.removeItem('usuarioAlgeGym');
      location.reload();
    });
  }

  const btnEditar = document.querySelector('.btn-editar');
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
      }
    });
  }

  const resumenCompra = document.getElementById('resumen-compra');
  if (resumenCompra) {
    const carrito = JSON.parse(localStorage.getItem('carritoAlgeGym')) || [];
    if (carrito.length === 0) return;

    let total = 0;
    carrito.forEach(item => total += item.precio);
    resumenCompra.dataset.total = total.toFixed(2);

    carrito.forEach((item, index) => {
      const eliminarBtn = document.querySelector(`.btn-eliminar[data-index="${index}"]`);
      if (eliminarBtn) {
        eliminarBtn.addEventListener('click', function () {
          eliminarDelCarrito(index);
        });
      }
    });
  }

  const formularioPago = document.getElementById('formulario-pago');
  if (formularioPago) {
    formularioPago.addEventListener('submit', function (e) {
      e.preventDefault();
      setTimeout(() => {
        localStorage.removeItem('carritoAlgeGym');
        window.location.href = 'usuario.html';
      }, 1000);
    });
  }

  function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carritoAlgeGym')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carritoAlgeGym', JSON.stringify(carrito));
    location.reload();
  }
});
