# Elemental Studios

Sitio corporativo en Astro para capacitación empresarial en inglés y portugués, con foco en hotelería, turismo y restaurantes.

## Desarrollo local

```powershell
npm install
npm start
```

Abre `http://localhost:4200`. El proyecto incluye un runtime Node 24 local; los comandos lo utilizan sin modificar el Node instalado en Windows.

## Verificación y producción

```powershell
npm run build
npm test
npm run preview
```

`build` ejecuta la revisión de tipos y genera el sitio estático en `dist/`. Publicar únicamente esa carpeta; Moodle sigue siendo un servicio externo independiente.

`npm test` comprueba el resultado generado: rutas, metadatos, recursos, enlaces, sitemap y exclusión de los archivos históricos.

## Contenido y funciones

- Portada con las tres fotografías proporcionadas y controles manuales accesibles.
- Programas por sector con una explicación conjunta de inglés y portugués.
- Sitio completo en español, inglés y portugués mediante archivos JavaScript de traducción y rutas estáticas.
- Diagnóstico de inglés integrado: 36 preguntas, nueve audios, pausas, guardado local e informe de habilidades.
- Preguntas frecuentes con controles nativos de teclado.
- Formulario que prepara una consulta para WhatsApp. No registra solicitudes ni afirma que se enviaron: el visitante envía el mensaje desde WhatsApp.
- Enlace real de Moodle y número de WhatsApp contrastados con el sitio público existente.
- URLs de los dos artículos anteriores conservadas, con contenido actualizado y sin estadísticas no respaldadas.
- Canonical, Open Graph, datos estructurados, sitemap, robots y página 404.
- Fuentes, iconos y fotografías servidos localmente. Sin jQuery, Bootstrap, AOS ni reCAPTCHA.

## Archivos principales

- `src/components/pages/HomePage.astro`: portada compartida por los tres idiomas.
- `src/components/pages/DiagnosticPage.astro`: instrucciones y acceso a la evaluación.
- `src/diagnostic`: banco, estado y lógica del diagnóstico.
- `src/i18n`: archivos JavaScript de traducción.
- `src/components/Contact.astro`: formulario y preparación de WhatsApp.
- `src/data/site.ts`: enlaces de Moodle y WhatsApp.
- `src/styles/global.css`: diseño y adaptación móvil.
- `public/images`: fotografías optimizadas.
- `docs/asset-provenance.md`: procedencia y prompt de la imagen ilustrativa de restaurante.
- `docs/i18n.md`: estructura y edición de traducciones.
- `docs/diagnostic-integration.md`: análisis del prototipo, integración y alcance del informe.

## Imágenes

Los originales se conservan en `imagenes/` y `legacy/angular/src/assets`. Para regenerar las versiones WebP:

```powershell
./node_modules/node/bin/node.exe scripts/prepare-images.mjs
```

La primera fotografía pasó de aproximadamente 2,2 MB a 100 KB en su versión de portada.

## Versión anterior

Los archivos originales de Angular se conservan en `legacy/angular`, con su `package.json`, lockfile, configuración, componentes y recursos. Esa carpeta no se compila ni se publica con Astro. El historial de Git también conserva la implementación anterior.

## Antes de publicar

Confirmar hosting y configuración de las rutas estáticas. La duración, mínimos de participantes, proceso comercial, referencias de clientes y condición ante SENCE quedan pendientes de validación; el sitio no incorpora afirmaciones sobre esos puntos. La medición de conversiones y un eventual envío de formularios por correo se pueden conectar cuando se defina el servicio correspondiente.
