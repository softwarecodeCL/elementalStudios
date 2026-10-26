import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { test } from "node:test";

const root = resolve("dist");
const routes = [];
for (const prefix of ["", "/en", "/pt"]) {
  for (const suffix of [
    "/",
    "/diagnostico-toeic/",
    "/noticias/la-importancia-de-saber-ingles/",
    "/noticias/dominar-el-ingles-facilmente/",
  ]) {
    const route = prefix + suffix;
    routes.push([
      route,
      route === "/" ? "index.html" : route.slice(1) + "index.html",
    ]);
  }
}
routes.push(["/404", "404.html"]);

for (const [route, file] of routes) {
  test(`HTML estático y metadatos válidos: ${route}`, () => {
    const html = readFileSync(join(root, file), "utf8");
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1);
    assert.equal([...html.matchAll(/property="og:title"/g)].length, 1);
    const data = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    assert.ok(data, "JSON-LD presente");
    assert.equal(JSON.parse(data[1])["@type"], "EducationalOrganization");
    assert.ok(!html.includes("{{"), "Sin interpolaciones sin resolver");
    assert.ok(
      !/jquery|bootstrap|recaptcha|owl-carousel/.test(html),
      "Sin dependencias heredadas",
    );
  });
}

test("Todos los enlaces y recursos internos del HTML publicado existen", () => {
  const missing = [];
  for (const [, file] of routes) {
    const html = readFileSync(join(root, file), "utf8");
    for (const match of html.matchAll(/\b(?:src|href)="(\/[^"\s]*)"/g)) {
      const url = new URL(match[1], "https://elementalstudios.cl");
      const pathname = decodeURIComponent(url.pathname);
      const direct = join(root, pathname);
      if (!existsSync(direct) && !existsSync(join(direct, "index.html")))
        missing.push(`${file}: ${pathname}`);
      if (url.hash && pathname === "/") {
        const home = readFileSync(join(root, "index.html"), "utf8");
        assert.ok(
          home.includes(`id="${url.hash.slice(1)}"`),
          `Destino de navegación ${url.hash}`,
        );
      }
    }
  }
  assert.deepEqual(missing, []);
});

test("Sitemap incluye los artículos y excluye la página 404", () => {
  const sitemap = readFileSync(join(root, "sitemap-0.xml"), "utf8");
  assert.ok(sitemap.includes("/noticias/la-importancia-de-saber-ingles/"));
  assert.ok(sitemap.includes("/noticias/dominar-el-ingles-facilmente/"));
  assert.ok(!sitemap.includes("/404"));
  assert.ok(
    readFileSync(join(root, "404.html"), "utf8").includes("noindex, follow"),
  );
});

test("La compilación no publica fuentes ni archivos de Angular", () => {
  const files = readdirSync(root);
  assert.ok(!files.includes("legacy"));
  assert.ok(!files.includes("src"));
  assert.ok(!files.includes("node_modules"));
  assert.ok(!files.includes("package.json"));
});

test("Se publican los nueve audios del diagnóstico", () => {
  for (let i = 0; i < 9; i++)
    assert.ok(existsSync(join(root, "diagnostico-toeic/audio/u" + i + ".mp3")));
});
test("Portadas sin metodología ni filtro de programas y con alternates de idioma", () => {
  for (const prefix of ["", "en/", "pt/"]) {
    const html = readFileSync(join(root, prefix + "index.html"), "utf8");
    assert.ok(!html.includes('id="metodologia"'));
    assert.ok(!html.includes("data-language="));
    assert.ok(html.includes('id="diagnostico"'));
    assert.equal([...html.matchAll(/rel="alternate" hreflang=/g)].length, 4);
  }
});
