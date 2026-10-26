# Implementación comercial, SEO y visibilidad en buscadores con IA

Fecha: 26 de octubre de 2026. Trabajo implementado en el proyecto local; publicación en el servidor pendiente.

## Qué se implementó

- Ocho páginas comerciales, cada una en español, inglés y portugués: inglés empresarial, portugués empresarial, idiomas para hotelería, restaurantes y turismo, SENCE, empresa y el curso Portugués para Negocios.
- Dos recursos nuevos para empresas, también en tres idiomas: evaluación de inglés de un equipo hotelero y capacitación compatible con turnos.
- Portada con propuesta empresarial explícita, acceso por idioma y sector, bloque SENCE, curso verificable y recursos relacionados.
- Navegación con programas desplegables, enlaces directos a SENCE y empresa, acceso al diagnóstico y selector de idiomas que conserva la página.
- Formulario que conserva programa, sector e idioma elegidos y permite indicar interés en SENCE. Prepara una consulta por WhatsApp; la persona realiza el envío.
- Resultados del diagnóstico con una llamada específica para empresas que necesitan evaluar a un equipo.
- Identidad común en todas las páginas: Elemental Studios SpA, RUT 77.616.179-9, teléfono y referencia a su perfil de LinkedIn. La dirección publicada en la ficha oficial se muestra en Nosotros.
- JSON-LD de EducationalOrganization con identificador estable, Service, Course, AboutPage, Article y BreadcrumbList según corresponda. El marcado coincide con el contenido visible y no incluye valoraciones ni credenciales inventadas.
- Títulos y descripciones propios, canonical, hreflang recíproco y sitemap de las rutas publicadas. La página 404 mantiene noindex.
- HTML estático: los textos principales de los programas son accesibles sin ejecutar JavaScript. El JavaScript del diagnóstico se carga en su página.

La compilación produce 43 páginas HTML, de las cuales 42 son indexables. Las rutas en `/en/` y `/pt/` conservan los mismos slugs neutros para mantener las equivalencias de idioma actuales.

## Fuentes y atribución SENCE

Ficha verificada en esta conversación: https://eligemejor.sence.cl/BuscarCursoNuevo/DetalleCurso?curso=1238088865

- OTEC: Elemental Studios SpA, RUT 77.616.179-9.
- Curso: Portugués para Negocios.
- Código: 1238088865.
- Duración: 81 horas e-learning.
- Término de vigencia publicado: 27 de noviembre de 2029.
- No exige conocimientos previos de portugués.

El código se atribuye únicamente a este curso, incluso cuando se menciona desde la portada, la página SENCE o Nosotros. El programa de inglés para hotelería se comunica con la oferta confirmada por el cliente, sin atribuirle un código todavía no proporcionado. No se publica precio ni se promete cobertura total automática.

Información general: https://sence.gob.cl/empresas/franquicia-tributaria

Las condiciones detalladas de franquicia se enlazan a SENCE; no se recrea una guía tributaria que pueda quedar obsoleta. La fuente oficial ya incluye resoluciones de octubre de 2026, por lo que cualquier explicación adicional debe contrastarse con la normativa vigente.

## Búsquedas y alcance de la investigación

Consultar `seo-investigacion-2026-10.md` y `seo-palabras-clave.csv` en esta carpeta.

La matriz contiene 44 consultas candidatas, intención, página asignada, evidencia y prioridad editorial. No contiene volúmenes inventados: falta la exportación del Planificador de Google Ads con Chile, Google y período configurado. Las páginas se sustentan en la oferta real, la revisión de intención y competidores; el volumen se usará para ajustar prioridades y contenidos.

La línea base de Search Console excluye Moodle: 21 clics y 127 impresiones en los 90 días del 26/07 al 23/10/2026. Hay consultas ocultas por privacidad y una muestra pequeña, así que no se extrapolan ventas ni posiciones.

## Visibilidad en Google y herramientas con IA

Se trabajó con contenido propio en texto, identidad verificable, enlaces internos, fuentes oficiales y marcado coherente. `robots.txt` permite el rastreo del contenido público. No se añadieron archivos o etiquetas que prometan una inclusión especial en IA.

Google indica que las prácticas SEO habituales se aplican a AI Overviews y AI Mode, y no exige archivos ni schema especiales:
https://developers.google.com/search/docs/appearance/ai-features

La documentación de OAI-SearchBot distingue el rastreo para búsquedas del rastreo de entrenamiento. El acceso puede depender también del CDN/firewall, no sólo de robots.txt:
https://developers.openai.com/api/docs/bots

Después de publicar se debe comprobar el acceso real por HTTPS, la indexación y cualquier bloqueo de infraestructura. La implementación no garantiza una posición, una fecha de indexación ni que un buscador cite la empresa.

## Medición preparada

Archivo: `src/scripts/measurement.ts`.

Se reutiliza la propiedad GA4 `G-BLWFBBYSJN`, encontrada en la versión Angular y confirmada por el usuario en esta conversación. El identificador está en `src/data/site.ts`.

La etiqueta se carga de forma asíncrona después del evento load, únicamente cuando el hostname es `elementalstudios.cl` o `www.elementalstudios.cl`. Desarrollo local y previews no envían visitas a la propiedad real. El config registra la página una sola vez mediante el comportamiento normal de GA4; no se añade un segundo page_view manual.

Los eventos emiten `elemental:measure` en `window` y se envían mediante gtag cuando está configurado. Se desactivan Google Signals y la personalización publicitaria. Las URLs enviadas en config no contienen parámetros ni fragmentos. El enlace de recuperación del formulario es un botón: el mensaje con datos de contacto no se expone como un href que la medición automática de enlaces salientes pudiera capturar.

| Evento | Cuándo ocurre |
| --- | --- |
| `view_program` | Carga de una página comercial; incluye la sección Nosotros y SENCE |
| `click_whatsapp` | Clic en un enlace hacia WhatsApp |
| `contact_prepared` | Formulario válido que prepara la consulta; no confirma envío ni recepción |
| `diagnostic_start` | Inicio de un intento del diagnóstico |
| `diagnostic_complete` | Finalización de todas las preguntas |
| `click_corporate_diagnostic` | Acceso desde resultados al contacto empresarial |

Datos permitidos: ruta sin parámetros, idioma de interfaz y, cuando corresponde, programa, sector, idioma de formación e interés en SENCE. No se incluyen nombre, empresa, correo, mensaje, respuestas ni puntuación del diagnóstico.

Para escuchar eventos con una herramienta ya configurada:

```js
window.addEventListener('elemental:measure', ({ detail }) => {
  // Adaptar al proveedor de analítica elegido y su configuración de privacidad.
  console.log(detail);
});
```

La implementación utiliza gtag directamente; no necesita un contenedor GTM adicional. En GA4, comprobar los eventos en Tiempo real/DebugView tras publicar y crear dimensiones personalizadas para programa, sector e idioma si se necesitan en informes. Revisar la medición mejorada existente antes de añadir eventos similares para evitar duplicarlos. No se cuenta una consulta como lead confirmado hasta que la empresa la recibe; cotizaciones y ventas necesitan registro comercial independiente.

## Publicación en Apache

`public/.htaccess` se copia a `dist/.htaccess` durante el build. Está preparado para el VirtualHost comercial de Apache 2.4 con `AllowOverride All`, descrito por el usuario. Contiene:

- Redirección de `www.elementalstudios.cl` hacia `https://elementalstudios.cl`, conservando ruta y parámetros.
- Página 404 real y desactivación del listado de directorios.
- Revalidación de HTML, XML y robots; caché de un día para imágenes y audio sin hash.
- Caché inmutable para `/_astro/`, cuyos archivos llevan huella en el nombre.
- Compresión de texto cuando mod_deflate esté disponible.

Los módulos opcionales están protegidos con IfModule. La configuración no se ha ejecutado en el Apache remoto; el preview de Astro no interpreta `.htaccess`.

Publicar el contenido completo de dist, incluido el archivo oculto, únicamente en el DocumentRoot del sitio comercial:

```text
/var/www/html/website/web/elementalStudios/dist
```

Confirmar que el VirtualHost ya apunta a esa ruta. Mantener disponibles los assets con hash de la publicación anterior durante el cambio para no romper pestañas o HTML todavía en caché. Esta tarea no ha modificado Moodle ni sus VirtualHosts.

Comprobaciones después de desplegar:

```bash
sudo apache2ctl configtest
curl -I https://www.elementalstudios.cl/idiomas-para-hoteleria/
curl -I https://elementalstudios.cl/idiomas-para-hoteleria/
curl -I https://elementalstudios.cl/una-ruta-inexistente/
curl -I https://elementalstudios.cl/sitemap-index.xml
```

Esperado: www redirige con 301 al dominio sin www; páginas reales 200; inexistentes 404. Revisar errores de Apache y cabeceras de un asset concreto. Si un módulo o política de overrides difiere del servidor descrito, ajustar ese bloque antes de dar por validado el despliegue.

Enviar `https://elementalstudios.cl/sitemap-index.xml` desde Search Console, inspeccionar portada, hotelería, portugués y SENCE. El conector actual es de solo lectura; no se ha enviado el sitemap desde esta sesión.

## Próximo ciclo

1. Publicar y anotar fecha efectiva del lanzamiento.
2. Comprobar Analytics en producción y registrar consultas recibidas/cotizaciones.
3. Incorporar código de inglés hotelero cuando esté disponible, tras comprobar su ficha.
4. Completar volúmenes del Planificador y ajustar prioridades.
5. Incorporar credenciales docentes y casos reales autorizados cuando el cliente los entregue.
6. Revisar indexación, consultas comerciales sin marca y contactos mensualmente, separando idiomas y Moodle.

El diseño, los contenidos y las comprobaciones están disponibles localmente. El período de resultados comienza tras la publicación, no con la fecha de esta implementación.
