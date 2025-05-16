// js/ui.js

function mostrarVentas(ventas) {
  const tabla = document.getElementById('tablaVentas');
  const cuerpo = document.getElementById('ventasBody');
  const totalSpan = document.getElementById('totalVentas');

  cuerpo.innerHTML = '';

  if (ventas.length === 0) {
    tabla.style.display = 'none';
    totalSpan.style.display = 'none';
    alert('No hay ventas para esa fecha');
    return;
  }

  let total = 0;
  ventas.forEach(v => {
    cuerpo.innerHTML += `<tr><td>${v.producto}</td><td>${v.precio}</td><td>${v.fecha}</td></tr>`;
    total += parseFloat(v.precio);
  });

  tabla.style.display = 'table';
  totalSpan.style.display = 'block';
  totalSpan.innerText = `Total del día: $${total.toFixed(2)}`;
}

function mostrarSeccion(id) {
  document.getElementById('menuPrincipal').style.display = 'none';
  document.getElementById('seccionRegistrar').style.display = 'none';
  document.getElementById('seccionConsultar').style.display = 'none';

  document.getElementById(id).style.display = 'block';
}

function volverAlMenu() {
  const menu = document.getElementById('menuPrincipal');
  menu.style.display = 'flex'; // mantener centrado
  menu.style.flexDirection = 'column';
  menu.style.justifyContent = 'center';
  menu.style.alignItems = 'center';
  
  document.getElementById('seccionRegistrar').style.display = 'none';
  document.getElementById('seccionConsultar').style.display = 'none';
}

