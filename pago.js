document.addEventListener('DOMContentLoaded', function() {
  const usuarioRegistrado = localStorage.getItem('usuarioAlgeGym');
  
  if (!usuarioRegistrado) {
      window.location.href = 'usuario.html?redirect=pago.html';
      return;
  }

  const carrito = JSON.parse(localStorage.getItem('carritoAlgeGym')) || [];
  const resumenCompra = document.getElementById('resumen-compra');
  
  if (carrito.length == 0) {
      resumenCompra.innerHTML = '<p>No hay items en tu carrito. <a href="planes.html">Ver planes</a></p>';
      return;
  }
  
  let html = '<div class="resumen-items">';
  let total = 0;
  
  carrito.forEach((item, index) => {
      total += item.precio;
      
      html += `
          <div class="item-carrito">
              <div>
                  <h4>${item.nombre}</h4>
                  <p>${item.descripcion || ''}</p>
                  <p class="precio">${item.precio.toFixed(2)}€</p>
              </div>
              <button class="btn-eliminar" data-index="${index}">Eliminar</button>
          </div>
      `;
  });
  
  html += `</div><div class="total-carrito"><strong>Total: ${total.toFixed(2)}€</strong></div>`;
  resumenCompra.innerHTML = html;
  
  document.querySelectorAll('.btn-eliminar').forEach(button => {
      button.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          eliminarDelCarrito(index);
      });
  });
  
  document.getElementById('formulario-pago').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Verificar si hay un plan en el carrito y actualizar el usuario
      const carrito = JSON.parse(localStorage.getItem('carritoAlgeGym')) || [];
      const planItem = carrito.find(item => item.tipo === 'plan');
      
      if (planItem && planItem.planType) {
          const usuario = JSON.parse(localStorage.getItem('usuarioAlgeGym'));
          if (usuario) {
              usuario.plan = planItem.planType;
              localStorage.setItem('usuarioAlgeGym', JSON.stringify(usuario));
          }
      }
      
      setTimeout(() => {
          localStorage.removeItem('carritoAlgeGym');
          window.location.href = 'usuario.html';
      }, 1000);
  });
  
  function eliminarDelCarrito(index) {
      const carrito = JSON.parse(localStorage.getItem('carritoAlgeGym')) || [];
      carrito.splice(index, 1);
      localStorage.setItem('carritoAlgeGym', JSON.stringify(carrito));
      location.reload();
  }
});