let index = 0;
const imagenes = document.getElementById('imagenes');
const total = imagenes.children.length;

function mostrarImagen(i) {
  if (i >= total) index = 0;
  else if (i < 0) index = total - 1;
  else index = i;

  imagenes.style.transform = `translateX(-${index * 100}%)`;
}

function siguiente() {
  mostrarImagen(index + 1);
}

function anterior() {
  mostrarImagen(index - 1);
}

setInterval(siguiente, 4000);
