# Integración del diagnóstico de inglés

## Análisis del prototipo

La carpeta `diagnostico-toeic/` original se conserva intacta como referencia del cliente. Contiene 36 preguntas en 23 bloques (15 Listening y 21 Reading), nueve MP3 y una configuración de captación cuyo endpoint está vacío.

El HTML del prototipo referencia una hoja `_astro/...css` y un logotipo que no vienen en esa carpeta. No era suficiente copiarlo al sitio. También mezclaba preguntas, interfaz, persistencia, puntuación y envío de contactos en un único script.

Las reproducciones de audio se contaban en una variable local que se reiniciaba al volver a un bloque. El estado guardado no validaba la estructura de respuestas y el tiempo incluía las pausas. La petición opcional de captación usaba `no-cors`, por lo que no podía confirmar el almacenamiento de un contacto.

## Implementación actual

- `/diagnostico-toeic/`, `/en/diagnostico-toeic/` y `/pt/diagnostico-toeic/` comparten componentes y lógica.
- Instrucciones nuevas: preparación del espacio, prueba de sonido sin revelar preguntas, estructura, reglas y alcance del resultado.
- Banco separado en `src/diagnostic/bank.js`. Conserva las preguntas, opciones y audios en inglés.
- Interfaz, instrucciones, retroalimentación y 36 explicaciones traducidas mediante archivos JavaScript.
- Selección accesible mediante radios nativos y avance por bloques.
- Hasta dos reproducciones por bloque, con persistencia al retroceder, recargar o cambiar de idioma.
- Pausa explícita y pausa al ocultar la página. Al recargar un intento activo se reanuda desde una pantalla de pausa.
- Transcripciones de apoyo, registradas en el informe.
- Persistencia validada y versionada en este navegador, bajo `elemental-english-diagnostic-v3`.
- Informe inmediato con aciertos, habilidades, prioridades de práctica y revisión de respuestas.
- Descarga de un informe PDF con identidad visual, resumen de resultados, gráficos vectoriales, mapa de habilidades, prioridades y revisión de las 36 respuestas. Textos seleccionables, paginación automática e idiomas ES/EN/PT. jsPDF se carga únicamente al solicitar la descarga y el documento se genera en el navegador, sin enviar resultados al servidor. Se conserva la opción de impresión.
- Ningún envío automático de respuestas o datos personales. El nombre es opcional; el contacto posterior abre el WhatsApp público de la empresa.

El banco es compartido entre idiomas: cambiar el idioma del sitio no convierte la herramienta en un diagnóstico de portugués.

## Interpretación del puntaje

La fórmula del prototipo se mantiene como una referencia secundaria, desplegable y explícitamente no validada. El resultado principal son los aciertos observados. No se promete un puntaje TOEIC oficial, una certificación MCER ni una predicción psicométrica.

TOEIC utiliza una escala obtenida mediante equiparación estadística, no una conversión universal de porcentaje de aciertos. Esta diferencia está explicada por [IIBC, administrador oficial del programa TOEIC](https://www.iibc-global.org/english/toeic/test/lr/guide05.html).

Las referencias de MCER se muestran por sección. Sus umbrales se contrastaron con la [tabla de ETS](https://www.ets.org/content/dam/ets-org/de/pdfs/toeic/toeic-4-skills-tests-mapping-table.pdf). Aplicar esos umbrales a la estimación del prototipo no valida ni certifica el resultado.

## Comprobaciones

Se recorrieron los 23 bloques, se generó el informe de 36 respuestas y se comprobó la descarga. Se verificaron reproducciones y transcripciones tras recarga y cambio de idioma, pausa sin sumar tiempo y metadatos válidos de los nueve MP3. La portada y el diagnóstico se revisaron entre 320 y 1440 píxeles para los tres idiomas.

La integración sigue siendo una herramienta orientativa de navegador. Para realizar evaluaciones controladas o almacenar resultados para empresas sería necesario acordar una integración de servidor y el uso de los datos; el endpoint vacío del prototipo no se activó.
