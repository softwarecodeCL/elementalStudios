# Recursos para empresas: contenido y diseño

26 de octubre de 2026. Implementación local, pendiente de publicar el nuevo dist.

## Ubicación y propósito

Se retiró el bloque de Recursos de la portada. El índice `/recursos/` se encuentra en el menú de Programas, la navegación móvil y el footer, con equivalentes ES/EN/PT. El inicio conserva el foco en servicios, sectores y contacto.

Los recursos ayudan a RR. HH. y operaciones a decidir y organizar una capacitación. Las guías deben resolver una pregunta y conectar con una oferta pertinente; no se amplía el sitio con artículos genéricos para acumular páginas.

## Cuatro guías reescritas

| Tema | Qué aporta | Próximo paso |
| --- | --- | --- |
| Inglés para recepción hotelera: reservas y solicitudes | Ejemplos breves de inglés, confirmación de datos, aclaraciones y coordinación entre áreas | Consultar capacitación para hotelería |
| Cómo elegir una capacitación de inglés para tu empresa | Preguntas para comparar necesidades, acceso, evaluaciones, informes y condiciones | Solicitar propuesta de inglés empresarial |
| Cómo evaluar las necesidades de inglés de un equipo hotelero | Matriz de tareas y habilidades, interpretación del test y decisiones de formación | Preparar la consulta de diagnóstico corporativo |
| Cómo organizar la capacitación de idiomas con turnos | Ventanas de estudio, responsables, acceso, seguimiento y contingencias | Consultar por la formación del equipo |

Cada guía tiene cuatro secciones, tres ideas principales, listas y, cuando son útiles, una tabla o un ejemplo. Los textos españoles tienen aproximadamente 500 palabras; todas las guías se reescribieron y tradujeron al inglés y portugués. Las anclas de sección se mantienen entre idiomas.

Se conservaron las cuatro URLs existentes bajo `/noticias/` para mantener enlaces previos. Sus títulos, metadatos y contenido se actualizaron. El índice utiliza CollectionPage/ItemList y cada guía Article/BreadcrumbList con identidad de Elemental Studios SpA.

## Diseño y experiencia

- Nuevo índice con guía destacada y tres complementarias, dentro del sistema navy, dorado, tipografías e iconos del sitio.
- Nueva plantilla de lectura: título y contexto, ideas principales, índice de secciones, columna de lectura, ejemplos y tablas.
- Índice lateral en escritorio y control nativo plegable en móvil; las tablas desplazan su contenido dentro de una región propia.
- Enlaces a programas, guías relacionadas y consulta según el tema, sin imponer el mismo recorrido a todos los artículos.
- HTML estático y controles nativos; no se incorporaron dependencias ni scripts adicionales para leer las guías.
- Eliminados los estilos de la antigua plantilla de artículos y del bloque retirado de la portada.

## Alcance editorial

Los ejemplos se presentan como ejercicios y pautas, no como resultados de clientes. La información sobre Moodle y seguimiento coincide con la oferta confirmada. No se promete cobertura SENCE automática, certificación del test, evaluación de conversación por una muestra de lectura ni un panel empresarial existente.

La investigación sobre tareas y evaluación está documentada en `diagnostico-corporativo-oportunidad.md`, con fuentes de ETS y Cambridge. No se consultó Search Console durante este desarrollo. Las prioridades son de utilidad comercial; no se atribuyen volúmenes de búsqueda sin una fuente.

## Verificación

Build con tipos válidos, comprobaciones de todas las rutas y recursos, y prueba específica de índice propio/ausencia en portada. El sitio completo pasa a 49 páginas HTML, 48 indexables. Verificar las rutas nuevas y su presentación en producción después de publicar dist.
