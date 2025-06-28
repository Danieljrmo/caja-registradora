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

async function registrarVenta() {
  const producto = document.getElementById('producto').value.trim();
  const precio = document.getElementById('precio').value.trim();
  const fecha = document.getElementById('fecha').value.trim();

  if (!producto || !precio || !fecha) {
    alert('Por favor completa todos los campos');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/ventas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto, precio, fecha })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Venta guardada correctamente');
      // Limpiar campos
      document.getElementById('producto').value = '';
      document.getElementById('precio').value = '';
      document.getElementById('fecha').value = '';
    } else {
      alert('Error al guardar la venta: ' + (data.message || 'Error desconocido'));
    }
  } catch (error) {
    console.error('Error al guardar venta:', error);
    alert('No se pudo conectar con el servidor');
  }
}

async function buscarPorRango() {
  const desde = document.getElementById('fechaInicio').value;
  const hasta = document.getElementById('fechaFin').value;

  if (!desde || !hasta) {
    alert("Selecciona ambas fechas");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/ventas/rango?desde=${desde}&hasta=${hasta}`);
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
      totalElement.textContent = `Total del periodo: $${total.toFixed(2)}`;
    } else {
      tabla.style.display = 'none';
      totalElement.style.display = 'none';
      alert("No hay ventas en ese rango");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Ocurrió un error al buscar ventas");
  }
}
