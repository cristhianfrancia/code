// =====================================================================
// CONTROL ÚNICO DE VIGENCIA para todas las páginas del repositorio.
// Para extender la vigencia de TODAS las páginas, cambia solo "fechaLimite".
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
    titulo: "Apartado requiere mantenimiento",
    detalle: "(Actualización en proceso)"
  };

  var pagina = decodeURIComponent((location.pathname.split("/").pop() || "").trim());
  var propia = CONFIG.paginas[pagina];
  var limite = typeof propia === "string" ? propia : CONFIG.fechaLimite;
  var vencida = CONFIG.bloquearTodo || propia === true || !(Date.now() <= new Date(limite).getTime());

  window.CP_VIGENCIA = { ok: !vencida, titulo: CONFIG.titulo, detalle: CONFIG.detalle };
  if (!vencida) return;

  // Oculta la página desde el inicio (sin parpadeo) y la reemplaza al cargar.
  document.write("<style>body{visibility:hidden}</style>");
  document.addEventListener("DOMContentLoaded", function () {
    document.body.innerHTML = "<h1 style='text-align:center;color:red;margin-top:20%;font-family:Calibri,Arial,sans-serif'>" +
      CONFIG.titulo + "</h1><h5 style='text-align:center;color:red;font-family:Calibri,Arial,sans-serif'>" + CONFIG.detalle + "</h5>";
    document.body.style.visibility = "visible";
  });
})();
