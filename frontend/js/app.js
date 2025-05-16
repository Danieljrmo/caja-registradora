async function consultarVentas() {
  const fecha = document.getElementById('fechaConsulta').value;
  if (!fecha) {
    alert('Selecciona una fecha');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/ventas/dia/${fecha}`);
    const ventas = await res.json();

    const tabla = document.getElementById('tablaVentas');
    const cuerpo = document.getElementById('ventasBody');
    const totalElement = document.getElementById('totalVentas');

    cuerpo.innerHTML = '';

    if (ventas.length > 0) {
      tabla.style.display = 'table';
      totalElement.style.display = 'block';

      ventas.forEach(v => {
        const row = `<tr><td>${v.producto}</td><td>${v.precio}</td><td>${v.fecha}</td></tr>`;
        cuerpo.innerHTML += row;
      });

      const total = ventas.reduce((sum, venta) => sum + parseFloat(venta.precio), 0);
      totalElement.textContent = `Total del día: $${total.toFixed(2)}`;
    } else {
      tabla.style.display = 'none';
      totalElement.style.display = 'none';
      alert('No hay ventas para esa fecha');
    }
  } catch (error) {
    console.error('Error al consultar ventas:', error);
    alert('Ocurrió un error al consultar las ventas.');
  }
}
