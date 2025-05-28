document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('carritoAlgeGym')) {
      localStorage.setItem('carritoAlgeGym', JSON.stringify([]));
    }
  
    document.querySelectorAll('.bono-btn, .boton-plan').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        let item = {};
        const buttonClass = this.className;
        
        if (buttonClass.includes('bono-btn')) {
          const bono = this.closest('.bono');
          item = {
            tipo: 'bono',
            nombre: bono.querySelector('h3').textContent,
            precio: parseFloat(bono.querySelector('.precio').textContent.replace('€', '').replace(',', '.')),
            descripcion: bono.querySelector('p').textContent,
            caducidad: bono.querySelector('.caducidad').textContent
          };
        } else if (buttonClass.includes('boton-plan')) {
          const plan = this.closest('.plan-card');
          const planType = plan.classList.contains('familiar') ? 'familiar' : 
                          plan.classList.contains('pareja') ? 'pareja' : 
                          plan.classList.contains('jubilados') ? 'jubilado' : '';
          
          item = {
            tipo: 'plan',
            nombre: plan.querySelector('h3').textContent,
            precio: parseFloat(plan.querySelector('.precio-plan').textContent.split('€')[0].replace(',', '.')),
            periodicidad: 'mensual',
            beneficios: Array.from(plan.querySelectorAll('.beneficios-plan li')).map(li => li.textContent),
            planType: planType
          };
          
          // Actualizar el plan del usuario en localStorage
          const usuario = JSON.parse(localStorage.getItem('usuarioAlgeGym'));
          if (usuario) {
            usuario.plan = planType;
            localStorage.setItem('usuarioAlgeGym', JSON.stringify(usuario));
          }
        }
        
        agregarAlCarrito(item);
        
        window.location.href = 'pago.html';
      });
    });
    
    function agregarAlCarrito(item) {
      const carrito = JSON.parse(localStorage.getItem('carritoAlgeGym'));
      carrito.push(item);
      localStorage.setItem('carritoAlgeGym', JSON.stringify(carrito));
    }
  });