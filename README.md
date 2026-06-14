# Recuerdos de Promoción — Cuadros de graduación (MVP)

Landing estática para promocionar cuadros de graduación tipo anuario
(foto del alumno + compañeros + lista del curso + nombre del colegio).

## Archivos
- `index.html` — estructura y contenido de la página
- `styles.css` — estilos (sin dependencias externas)
- `script.js` — año dinámico + envío del formulario por WhatsApp

## Cómo levantarlo en local
Desde esta carpeta:

```bash
python -m http.server 8000
```

Luego abre: http://localhost:8000

## Qué personalizar (busca y reemplaza)
1. **Número de WhatsApp / teléfono**: `56900000000`
   - En `script.js` (constante `WHATSAPP_NUMERO`)
   - En `index.html` (enlaces `wa.me/...`, `tel:...` y botón flotante)
2. **Nombre de marca**: "Recuerdos de Promoción"
3. **Correo**: `contacto@recuerdosdepromocion.cl`
4. **Precios**: sección `#precios` en `index.html`
5. **Fotos reales**: crea una carpeta `img/` y reemplaza los bloques de la galería

## Publicar gratis en internet
Es 100% estático, así que sirve cualquiera de estos:
- **GitHub Pages**: sube los archivos a un repo y activa Pages
- **Netlify / Vercel**: arrastra la carpeta o conecta el repo
- **Cloudflare Pages**: igual, carpeta estática
