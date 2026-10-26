# Diagnóstico de inglés para empresas — implementación

26 de octubre de 2026. Implementado localmente; requiere publicar el nuevo `dist/`.

## Página y alcance

Ruta principal: `/diagnostico-ingles-empresas/`, con equivalentes `/en/` y `/pt/`. El contenido está en archivos JavaScript de traducción, con metadatos, canonical, hreflang, Service y BreadcrumbList. Con el nuevo índice de Recursos, la compilación incluye 49 páginas HTML, 48 indexables.

La landing aborda la decisión de RR. HH. y operaciones antes de capacitar: cargos, tareas y necesidades de comunicación. Utiliza ejemplos de hotelería, restaurantes y turismo y un mapa de planificación identificado como ejemplo. El test individual sigue disponible como opción complementaria.

Se mantiene el alcance confirmado: diagnóstico inicial dentro de la capacitación, formación online/asincrónica, Moodle, evaluaciones y seguimiento. No se promete certificación del test, evaluación oral automática, consolidado empresarial, nuevos plazos ni un servicio independiente con precio no confirmado.

La investigación y sus fuentes se encuentran en `diagnostico-corporativo-oportunidad.md`. Se consultaron Cambridge, ETS y oferta empresarial competidora; no se consultó Search Console durante este trabajo ni se inventaron volúmenes.

## Preparador de consulta

Cuatro decisiones: sector, cargos, rango de participantes y objetivo. Sólo el sector es obligatorio; los cargos se pueden omitir y el tamaño puede quedar por definir. Las opciones son categorías de contexto comercial, no mínimos de contratación ni un cálculo de nivel.

1. La persona selecciona el contexto de su equipo.
2. Se muestra un resumen que cambia con las selecciones.
3. Al continuar, el formulario existente recibe programa, sector, idioma y contexto del equipo.
4. La persona puede volver a modificar el equipo o cambiar el idioma de la web conservando las categorías válidas.
5. El mensaje preparado para WhatsApp incluye cargos, tamaño y objetivo. El visitante realiza el envío.

Las categorías se conservan en `sessionStorage` de la pestaña y en parámetros permitidos de navegación, sin datos personales. Si el navegador bloquea el almacenamiento, la URL mantiene el contexto. El modelo descarta sectores, cargos, tamaños u objetivos desconocidos. Los textos se insertan mediante textContent.

Los nombres, empresa, correo y mensaje se solicitan únicamente en el contacto. No se guardan en el resumen de equipo ni se añaden a URLs internas o eventos. Sin JavaScript, el preparador se oculta y queda un contacto directo por WhatsApp. El formulario general no permite un envío GET accidental de datos personales cuando no se ejecuta su script.

## Integración comercial

- La portada presenta primero la oportunidad empresarial y mantiene el test individual visible.
- El menú, footer, programas relevantes y el artículo de evaluación enlazan a la nueva página.
- El informe individual enlaza al preparador corporativo.
- El sitemap incorpora automáticamente las tres versiones.

## Medición

Se reutiliza GA4 ya configurado; sólo se activa en el dominio de producción. Nuevos eventos:

- `corporate_brief_prepared`: preparación del contexto, con programa, sector, rango de equipo y objetivo.
- `click_individual_diagnostic`: elección del test individual desde enlaces identificados.

`view_program` reconoce la página nueva; `contact_prepared` incorpora rango y objetivo cuando existe un contexto corporativo válido. Los eventos no contienen cargos individuales identificables, nombres, correos, empresas, mensajes, respuestas ni puntuaciones. Preparar una consulta no equivale a recibirla o vender una capacitación.

## Crédito de desarrollo

El footer incorpora “Diseño y desarrollo” y el enlace `https://softwarecode.cl/`, con traducción ES/EN/PT, símbolo `</>`, marca con acento dorado y estados hover/focus. No se añadieron dependencias, imágenes ni animaciones para este crédito.

## Comprobación

- Build de Astro y revisión de tipos.
- 64 comprobaciones automáticas, incluyendo restauración de categorías, datos inválidos y equivalencia de las traducciones.
- Recorrido de preparación, contacto, edición, cambio ES→EN y mensaje de WhatsApp verificado con envío interceptado.
- Vista de la nueva página en los tres idiomas a 320, 390, 768 y 1440 px, sin desbordamiento horizontal.
- Crédito de softwarecode.cl comprobado en escritorio y móvil.
- Acceso sin JavaScript conserva contenido y contacto directo.

La próxima mejora de contenido debe ser una muestra real autorizada de informe o un caso verificable, cuando el cliente los entregue. Hasta entonces, el ejemplo de planificación es ilustrativo y no presenta resultados ficticios.
