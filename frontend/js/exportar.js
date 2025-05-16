// js/exportar.js

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const tabla = document.getElementById('tablaVentas');
  if (tabla.style.display === 'none') {
    alert('No hay datos para exportar');
    return;
  }

  const doc = new jsPDF();
  let contenido = '';
  const rows = tabla.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].querySelectorAll('th, td');
    let filaTexto = [];
    cols.forEach(col => filaTexto.push(col.innerText));
    contenido += filaTexto.join(' \t ') + '\n';
  }

  doc.text(contenido, 10, 10);
  doc.save('ventas.pdf');
}

function exportarExcel() {
  const tabla = document.getElementById('tablaVentas');
  if (tabla.style.display === 'none') {
    alert('No hay datos para exportar');
    return;
  }
  const workbook = XLSX.utils.table_to_book(tabla, { sheet: "Ventas" });
  XLSX.writeFile(workbook, 'ventas.xlsx');
}
