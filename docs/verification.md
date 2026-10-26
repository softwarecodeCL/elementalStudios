# Verificación de la primera versión

## Actualización: nuevo espacio de recursos — 26/10/2026

Estado actual: 49 páginas HTML, 48 indexables, 68 comprobaciones correctas y revisión de tipos sin errores, advertencias ni sugerencias. Se comprobó que Recursos no aparezca como sección del inicio y que su índice propio enlace las cuatro guías.

Revisión en navegador: hub y cuatro artículos en ES/EN/PT a 320, 768 y 1440 px (45 combinaciones), sin desbordamientos horizontales. Se verificaron índice/anclas, tablas con desplazamiento interno, navegación móvil, footer y llamada de consulta contextual. El recorrido corporativo también se probó bloqueando sessionStorage: las categorías válidas se conservaron en navegación y edición mediante la URL, sin datos personales ni errores del navegador.

Ver `recursos-empresariales.md` para contenido, diseño y ubicación. Se retiraron las reglas CSS de la plantilla antigua de artículos y del bloque eliminado del inicio.

## Actualización: diagnóstico corporativo y crédito — 26/10/2026

Compilación actual: 46 páginas, 45 indexables, tipos sin errores ni advertencias. Pasan 64 comprobaciones. Se añadió `scripts/corporate-brief.test.mjs` al comando de pruebas; el mismo runtime local permite ejecutarlo con `--test-isolation=none` junto con los dos conjuntos existentes.

Recorrido comprobado: selección de sector/cargos/tamaño/objetivo → resumen → contacto → cambio de idioma → WhatsApp preparado → edición del equipo. Envíos interceptados, sin contactar a nadie. Los eventos contienen sólo categorías válidas. Las tres versiones de la landing se revisaron a 320, 390, 768 y 1440 px, sin desbordamientos. Crédito de softwarecode.cl comprobado en móvil y escritorio.

Consultar `diagnostico-corporativo-implementacion.md` para el alcance actual. Los apartados siguientes conservan las comprobaciones de las etapas anteriores.

## Actualización: estructura comercial y SEO — 26/10/2026

Compilación actual: 43 páginas estáticas, 42 indexables; revisión de tipos sin errores, advertencias ni sugerencias. Pasan 57 comprobaciones: metadatos y JSON-LD de todas las páginas, canonical/hreflang recíprocos, sitemap, enlaces y fragmentos reales, paridad de traducciones, atribución SENCE y lógica del diagnóstico.

Comando utilizado en este entorno Windows restringido:

```powershell
& .\node_modules\node\bin\node.exe --test --test-isolation=none scripts/verify-build.mjs scripts/diagnostic.test.mjs
```

La ejecución normal de `npm test` encontró `spawn EPERM` por el aislamiento de procesos del entorno; el mismo conjunto pasó con el runtime local sin crear procesos de prueba aislados.

### Navegador y experiencia

- Páginas representativas revisadas entre 320, 390, 768 y 1440 px, más variantes EN/PT a 320 y 1440 px: sin desbordamiento horizontal.
- Programa desplegable, cierre con Escape, menú móvil desplazable en 320×640, navegación por idiomas conservando página y navbar fijo verificados.
- CTA hotelería preselecciona programa, sector e idiomas. Formulario válido prepara WhatsApp con ese contexto y la opción SENCE. Los envíos se interceptaron; no se contactó a nadie.
- Diagnóstico: eventos de inicio y finalización, resultados y acceso al contacto corporativo comprobados con respuestas simuladas en contexto aislado.
- Página comercial y CTA accesibles con JavaScript desactivado. El formulario mantiene alternativa de contacto directo.
- GA4 probado con dominio de producción simulado, páginas servidas desde el preview y etiqueta externa sustituida por un stub. Se comprobó el ID confirmado, config único por carga y eventos view_program/contact_prepared/click_whatsapp. Los eventos no contenían nombre, empresa, correo o mensaje. No se enviaron estas pruebas a Google.
- En localhost no se carga la etiqueta GA4. Falta comprobar recepción en Tiempo real después del despliegue real.

### Rendimiento de laboratorio

Muestra local en Chromium: viewport 390×844, caché deshabilitada, latencia 150 ms, descarga 200.000 bytes/s, subida 100.000 bytes/s y CPU limitada a 4×. Captura mediante PerformanceObserver después de carga y fuentes, con 600 ms adicionales para observar estabilidad. Una navegación por página, no una distribución de usuarios.

| Página | LCP | FCP | CLS |
| --- | ---: | ---: | ---: |
| Portada | 1.772 ms | 1.084 ms | 0,0228 |
| Hotelería | 1.372 ms | 680 ms | 0,0011 |
| Portugués para Negocios | 860 ms | 648 ms | 0,0011 |

Estos resultados corresponden al preview local sin etiqueta externa de Analytics, que sólo carga en el dominio público. No son Lighthouse, CrUX, INP ni acreditan el cumplimiento de Core Web Vitals en producción. Será necesario revisar datos reales después del lanzamiento. Se eliminaron de la carga de portada los diccionarios completos del diagnóstico: los archivos JavaScript externos cargados sumaban aproximadamente 3,5 KB en esa muestra (no incluye scripts inline ni Analytics).

### Límites de la validación local

`dist/.htaccess` se publica correctamente, pero Astro Preview no interpreta reglas Apache. Redirección www, compresión, caché y estado 404 deben validarse en el servidor. La publicación y la inspección del sitio nuevo en Search Console siguen pendientes; no se modificaron VirtualHosts ni Moodle.

El alcance ejecutado y las fuentes están documentados en `seo-implementacion.md` y `seo-investigacion-2026-10.md`. Los apartados siguientes corresponden a versiones anteriores.

## Actualización: diagnóstico e idiomas

La renovación posterior genera 13 páginas y pasa 24 pruebas automáticas. La compilación termina con 0 errores y 0 advertencias. Se verificó la navegación ES/EN/PT, el mantenimiento de la página y su fragmento, los mensajes de WhatsApp traducidos y la ausencia de metodología y del antiguo filtro de programas.

El diagnóstico se recorrió completo por sus 23 bloques. Se comprobaron las 36 respuestas del informe, las 15 habilidades, la descarga del resumen, el sonido de prueba y la carga de los nueve MP3. Las pruebas de recarga y cambio de idioma conservaron respuestas, reproducciones y transcripciones; la pausa no sumó tiempo activo.

La portada y las instrucciones se revisaron en los tres idiomas desde 320 hasta 1440 píxeles, sin desbordamiento horizontal. El informe también se revisó en móvil. Consola final: 0 errores y 0 advertencias. Los mensajes de contacto se interceptaron durante las pruebas y no se enviaron a ninguna persona.

El detalle actual está en `docs/diagnostic-integration.md` y `docs/i18n.md`. Las comprobaciones de la entrega inicial se conservan a continuación como historial.

Validación realizada el 26 de octubre de 2026 sobre la compilación de producción, servida localmente mediante Astro Preview.

## Resultado

- `npm run build`: correcto; 0 errores, 0 advertencias y 0 sugerencias de tipos.
- `npm test`: 7 comprobaciones correctas sobre la salida estática.
- `npm audit fix`: auditoría resultante sin vulnerabilidades conocidas.
- Consola del navegador en la página principal: 0 errores y 0 advertencias.

## Interacciones comprobadas en navegador

1. El selector de portugués actualiza las tarjetas y ejemplos de comunicación.
2. Consultar un programa preselecciona su sector y el idioma en el formulario.
3. Los controles siguiente y anterior del carrusel actualizan fotografía e indicador.
4. Las preguntas frecuentes abren su respuesta.
5. El formulario impide continuar si faltan datos obligatorios.
6. Una consulta válida prepara la URL de WhatsApp con empresa, idioma y caracteres acentuados.
7. Se presenta un enlace alternativo si el navegador bloquea la nueva ventana.
8. El menú móvil abre, permite navegar y se cierra al elegir una sección.
9. El menú móvil también cierra con Escape.

La prueba de WhatsApp interceptó `window.open` para verificar la URL sin contactar a ninguna persona ni enviar mensajes. No se probaron el inicio de sesión de Moodle ni el envío de mensajes reales.

## Diseño adaptable y rutas

Sin desbordamiento horizontal a 320, 360, 390, 540, 768, 1024, 1440 y 1920 píxeles. Revisión visual con fotografías y fuentes cargadas a 390 y 1440 píxeles.

Las dos URLs de artículos devuelven 200; una URL inexistente devuelve 404 y muestra la página correspondiente. La página 404 está excluida del sitemap y tiene `noindex`.

El enlace de Moodle se contrastó con el sitio público. El enlace público de contacto redirige al mismo número utilizado para preparar el formulario: `56982414460`.

## Alcance pendiente

La entrega es local. No se cambió el dominio, el hosting ni Moodle. El formulario prepara mensajes para WhatsApp; no hay envío de correos ni almacenamiento de solicitudes. No se publicaron afirmaciones sobre SENCE, clientes, cifras de resultados, clases en vivo, plazos de respuesta o contratación sin confirmar.
