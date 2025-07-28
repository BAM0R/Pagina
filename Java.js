async function imprimirYDescargarPDF() {
  const form = document.getElementById("formulario-compra");

  // Captura visual del formulario
  const canvas = await html2canvas(form);
  const imgData = canvas.toDataURL("image/png");

  // Mostrar ventana de impresión
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`<img src="${imgData}" style="width:100%">`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();

  // Generar y descargar el PDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("formulario_compra.pdf");
}
