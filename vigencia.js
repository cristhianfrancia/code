// =====================================================================
// CONTROL ÚNICO DE VIGENCIA para todas las páginas del repositorio.
// Aquí se decide la fecha, los bloqueos y cómo se ve la pantalla de
// mantenimiento. Las páginas no necesitan cambios para nada de esto.
// GitHub Pages tarda hasta ~10 minutos en reflejar el cambio.
// =====================================================================
(function () {
  var CONFIG = {
    // Hora de Lima (-05:00): no depende de la zona horaria de cada PC.
    fechaLimite: "2026-11-30T23:59:59-05:00",
    // true = bloquea todas las páginas de inmediato (sin esperar la fecha).
    bloquearTodo: false,
    // Bloqueos o fechas propias por página, por nombre de archivo. Ejemplos:
    //   "SAR_NEW_descuentodesaldo.html": true                          → bloqueada
    //   "SGU_Mifi_Lentitud.html": "2026-12-15T23:59:59-05:00"           → su propia fecha
    paginas: {},
    // Textos de la pantalla de mantenimiento.
    titulo: "Herramienta en mantenimiento",
    mensaje: "Estamos actualizando esta herramienta para ofrecerte una mejor experiencia. Vuelve a intentarlo en unos minutos.",
    ayuda: "Si necesitas apoyo inmediato, comunícate con tu supervisor.",
    firma: "Cristhian Francia · Herramientas de atención"
  };

  var pagina = decodeURIComponent((location.pathname.split("/").pop() || "").trim());
  var propia = CONFIG.paginas[pagina];
  var limite = typeof propia === "string" ? propia : CONFIG.fechaLimite;
  var vencida = CONFIG.bloquearTodo || propia === true || !(Date.now() <= new Date(limite).getTime());

  window.CP_VIGENCIA = { ok: !vencida };
  if (!vencida) return;

  // Oculta la página desde el inicio (sin parpadeo) y muestra la pantalla al cargar.
  document.write("<style>body{visibility:hidden}</style>");

  function texto(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function mostrar() {
    if (!document.body || document.getElementById("cpv-mantenimiento")) return;
    document.title = CONFIG.titulo;
    // En el celular, sin esta etiqueta la pantalla se vería diminuta en páginas que no la traen.
    if (!document.querySelector("meta[name=viewport]")) {
      var meta = document.createElement("meta");
      meta.name = "viewport"; meta.content = "width=device-width, initial-scale=1";
      document.head.appendChild(meta);
    }
    document.body.innerHTML =
      "<style>" +
      "#cpv-mantenimiento{all:initial;position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;" +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:radial-gradient(1200px 600px at 15% 10%,#e8f0fb 0%,transparent 60%),radial-gradient(900px 500px at 90% 90%,#fff6d6 0%,transparent 55%),#f5f7fb;}" +
      "#cpv-mantenimiento *{box-sizing:border-box;}" +
      ".cpv-tarjeta{width:min(520px,100%);background:#fff;border:1px solid #e4e9f2;border-radius:24px;padding:40px 36px 28px;text-align:center;box-shadow:0 24px 60px rgba(12,71,126,.12),0 2px 6px rgba(12,71,126,.06);animation:cpv-entrar .5s cubic-bezier(.2,.8,.2,1) both;}" +
      ".cpv-icono{width:72px;height:72px;margin:0 auto 22px;border-radius:20px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0c477e,#01768b);box-shadow:0 10px 24px rgba(12,71,126,.28);}" +
      ".cpv-icono svg{width:36px;height:36px;animation:cpv-girar 6s linear infinite;}" +
      ".cpv-etiqueta{display:inline-block;margin-bottom:14px;padding:5px 12px;border-radius:999px;background:#fff6d6;color:#7a5a00;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;}" +
      ".cpv-titulo{margin:0 0 12px;color:#0c2a4d;font-size:26px;line-height:1.25;font-weight:750;}" +
      ".cpv-mensaje{margin:0 auto 10px;max-width:400px;color:#4a5872;font-size:16px;line-height:1.6;}" +
      ".cpv-ayuda{margin:0 auto 26px;max-width:400px;color:#6b7891;font-size:14px;line-height:1.5;}" +
      ".cpv-boton{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border:0;border-radius:12px;background:#0c477e;color:#fff;font:600 15px inherit;font-family:inherit;cursor:pointer;transition:background .2s,transform .2s;}" +
      ".cpv-boton:hover{background:#01768b;transform:translateY(-1px);}" +
      ".cpv-boton:focus-visible{outline:3px solid #fde204;outline-offset:3px;}" +
      ".cpv-pie{margin-top:28px;padding-top:18px;border-top:1px solid #eef1f6;color:#9aa5b8;font-size:12px;}" +
      "@keyframes cpv-entrar{from{opacity:0;transform:translateY(12px) scale(.98);}to{opacity:1;transform:none;}}" +
      "@keyframes cpv-girar{to{transform:rotate(360deg);}}" +
      "@media (prefers-reduced-motion:reduce){.cpv-tarjeta,.cpv-icono svg{animation:none;}}" +
      "@media (max-width:480px){.cpv-tarjeta{padding:32px 22px 22px;border-radius:20px;}.cpv-titulo{font-size:22px;}}" +
      "</style>" +
      "<div id='cpv-mantenimiento' role='alert' aria-live='assertive'><div class='cpv-tarjeta'>" +
      "<div class='cpv-icono' aria-hidden='true'><svg viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'>" +
      "<circle cx='12' cy='12' r='3'/><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'/></svg></div>" +
      "<span class='cpv-etiqueta'>Actualización en curso</span>" +
      "<h1 class='cpv-titulo'>" + texto(CONFIG.titulo) + "</h1>" +
      "<p class='cpv-mensaje'>" + texto(CONFIG.mensaje) + "</p>" +
      "<p class='cpv-ayuda'>" + texto(CONFIG.ayuda) + "</p>" +
      "<button type='button' class='cpv-boton' onclick='location.reload()'>&#x21bb; Volver a intentar</button>" +
      "<div class='cpv-pie'>" + texto(CONFIG.firma) + "</div>" +
      "</div></div>";
    document.body.style.visibility = "visible";
    document.body.style.overflow = "hidden";
  }

  // Se muestra al tener el contenido y se reafirma al terminar la carga,
  // por si algún código de la página intenta dibujar después.
  document.addEventListener("DOMContentLoaded", mostrar);
  window.addEventListener("load", function () {
    if (!document.getElementById("cpv-mantenimiento")) { document.body.innerHTML = ""; mostrar(); }
  });
})();
