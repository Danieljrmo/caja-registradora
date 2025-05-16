// js/api.js

const API_URL = 'http://localhost:3000/api';

async function guardarVenta(producto, precio, fecha) {
  const res = await fetch(`${API_URL}/ventas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ producto, precio, fecha })
  });
  return await res.json();
}

async function obtenerVentasPorDia(fecha) {
  const res = await fetch(`${API_URL}/ventas/dia/${fecha}`);
  return await res.json();
}
