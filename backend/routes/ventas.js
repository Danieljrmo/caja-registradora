const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar una venta
router.post('/ventas', (req, res) => {
  const { producto, precio, fecha } = req.body;
  if (!producto || !precio || !fecha) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  const query = 'INSERT INTO ventas (producto, precio, fecha) VALUES (?, ?, ?)';
  db.query(query, [producto, precio, fecha], (err, result) => {
    if (err) {
      console.error('Error al guardar venta:', err);
      return res.status(500).json({ error: 'Error al guardar la venta' });
    }
    res.status(201).json({ message: 'Venta registrada con éxito' });
  });
});

// Obtener ventas por fecha exacta (ej: 2025-05-15)
router.get('/ventas/dia/:fecha', (req, res) => {
  const fecha = req.params.fecha;
  const query = 'SELECT * FROM ventas WHERE fecha = ?';
  db.query(query, [fecha], (err, results) => {
    if (err) {
      console.error('Error al obtener ventas:', err);
      return res.status(500).json({ error: 'Error al obtener ventas' });
    }
    res.json(results);
  });
});

// Obtener ventas por mes (ej: 2025-05)
router.get('/ventas/mes/:anoMes', (req, res) => {
  const [ano, mes] = req.params.anoMes.split('-');
  const query = 'SELECT * FROM ventas WHERE YEAR(fecha) = ? AND MONTH(fecha) = ?';
  db.query(query, [ano, mes], (err, results) => {
    if (err) {
      console.error('Error al obtener ventas del mes:', err);
      return res.status(500).json({ error: 'Error al obtener ventas' });
    }
    res.json(results);
  });
});

// Obtener suma total del día
router.get('/total/:fecha', async (req, res) => {
  const fecha = req.params.fecha;
  try {
    const [rows] = await db.query(
      'SELECT SUM(precio) AS total FROM ventas WHERE DATE(fecha) = ?',
      [fecha]
    );
    res.json({ total: rows[0].total || 0 });
  } catch (error) {
    console.error('Error al obtener total:', error);
    res.status(500).json({ error: 'Error al obtener total del día' });
  }
});

router.get('/rango', (req, res) => {
  const { desde, hasta } = req.query;
  const query = 'SELECT * FROM ventas WHERE fecha BETWEEN ? AND ?';

  connection.query(query, [desde, hasta], (err, results) => {
    if (err) {
      console.error('Error al consultar por rango:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(results);
  });
});


module.exports = router;

