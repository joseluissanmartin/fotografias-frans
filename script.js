// === Año dinámico en el footer ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Número de WhatsApp del negocio (cámbialo por el real) ===
// Formato internacional sin "+", sin espacios. Ej: 56912345678
const WHATSAPP_NUMERO = '56900000000';

// === Enviar formulario por WhatsApp ===
function enviarPorWhatsApp(event) {
  event.preventDefault();

  const nombre = document.getElementById('f-nombre').value.trim();
  const colegio = document.getElementById('f-colegio').value.trim();
  const curso = document.getElementById('f-curso').value.trim();
  const mensaje = document.getElementById('f-mensaje').value.trim();

  let texto = `Hola! Soy ${nombre}.`;
  if (colegio) texto += ` Del colegio ${colegio}`;
  if (curso) texto += `, curso ${curso}`;
  texto += `. Quiero información sobre los cuadros de graduación.`;
  if (mensaje) texto += ` ${mensaje}`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}
