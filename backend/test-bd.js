const db = require('./db');

db.query('SELECT 1', (err, results) => {
  if (err) throw err;
  console.log('✅ Conexión probada con éxito:', results);
  db.end(); // Cierra la conexión después de la prueba
});
