import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { test } from "node:test";
import {
  commercialSlugs,
  getCommercialMessages,
} from "../src/i18n/commercial/index.js";

const root = resolve("dist");
const origin = "https://elementalstudios.cl";
const organizationId = `${origin}/#organization`;
const localePrefixes = ["", "/en", "/pt"];
const localeTags = ["es-CL", "en", "pt-BR"];
const decodeAttribute = (value = "") =>
  value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key,
      decodeAttribute(value),
    ]),
  );
function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}
const files = filesIn(root);
const pages = files
  .filter((file) => extname(file) === ".html")
  .map((file) => {
    const publishedPath = relative(root, file).replaceAll("\\", "/");
    const route = `/${publishedPath}`.replace(/index\.html$/, "");
    const html = readFileSync(file, "utf8");
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) =>
      attributes(tag),
    );
    const canonical = links.find((link) => link.rel === "canonical")?.href;
    const jsonLd = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
      .filter(([, attr]) => attributes(attr).type === "application/ld+json")
      .map(([, , json]) => JSON.parse(json));
    const noindex = [...html.matchAll(/<meta\b[^>]*>/g)].some(([tag]) => {
      const meta = attributes(tag);
      return meta.name === "robots" && /\bnoindex\b/.test(meta.content);
    });
    return { file, route, html, links, canonical, jsonLd, noindex };
  });
const byRoute = new Map(pages.map((page) => [page.route, page]));
const entities = (json) =>
  Array.isArray(json)
    ? json.flatMap(entities)
    : json?.["@graph"]
      ? json["@graph"].flatMap(entities)
      : [json];

for (const { route, html, canonical, links, jsonLd, noindex } of pages) {
  test(`HTML estático y metadatos válidos: ${route}`, () => {
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.equal(links.filter((link) => link.rel === "canonical").length, 1);
    assert.equal(new URL(canonical).origin, origin);
    assert.equal(new URL(canonical).search, "");
    assert.equal(new URL(canonical).hash, "");
    if (!noindex) assert.equal(canonical, origin + route);
    assert.equal([...html.matchAll(/<title>/g)].length, 1);
    assert.ok(/<title>[^<]+<\/title>/.test(html));
    assert.equal([...html.matchAll(/name="description"/g)].length, 1);
    assert.equal([...html.matchAll(/property="og:title"/g)].length, 1);
    assert.ok(jsonLd.length, "JSON-LD presente y válido");
    const organization = jsonLd.flatMap(entities).find(
      (entity) => entity["@type"] === "EducationalOrganization",
    );
    assert.ok(organization, "Organización educativa presente");
    assert.equal(organization["@id"], organizationId);
    assert.equal(organization.name, "Elemental Studios");
    assert.equal(organization.legalName, "Elemental Studios SpA");
    assert.equal(organization.taxID.replace(/[.\s]/g, ""), "77616179-9");
    const localeIndex = route.startsWith("/en/")
      ? 1
      : route.startsWith("/pt/")
        ? 2
        : 0;
    assert.equal(
      attributes(html.match(/<html\b[^>]*>/)[0]).lang,
      localeTags[localeIndex],
    );
    if (!noindex) {
      const neutral = route.replace(/^\/(en|pt)(?=\/)/, "");
      const alternates = links.filter((link) => link.rel === "alternate");
      assert.equal(alternates.length, 4);
      for (let index = 0; index < localePrefixes.length; index++) {
        const expectedRoute = localePrefixes[index] + neutral;
        const target = byRoute.get(expectedRoute);
        assert.ok(target && !target.noindex, `Traducción publicada: ${expectedRoute}`);
        assert.equal(
          alternates.find((link) => link.hreflang === localeTags[index])?.href,
          origin + expectedRoute,
        );
      }
      assert.equal(
        alternates.find((link) => link.hreflang === "x-default")?.href,
        origin + neutral,
      );
    }
    assert.ok(!html.includes("{{"), "Sin interpolaciones sin resolver");
    assert.ok(!/\uFFFD|Ã[\u0080-\u00BF]|Â[\u0080-\u00BF]|â€/.test(html), "Texto UTF-8 válido");
    assert.ok(
      !/jquery|bootstrap|recaptcha|owl-carousel/.test(html),
      "Sin dependencias heredadas",
    );
  });
}

test("Todos los enlaces y recursos internos del HTML publicado existen", () => {
  const missing = [];
  for (const { route, html } of pages) {
    for (const match of html.matchAll(/\b(?:src|href)="([^"\s]*)"/g)) {
      const value = decodeAttribute(match[1]);
      if (!value || /^(?:data:|javascript:|mailto:|tel:)/.test(value)) continue;
      const url = new URL(value, origin + route);
      if (url.origin !== origin) continue;
      const pathname = decodeURIComponent(url.pathname);
      const direct = join(root, pathname);
      const page = byRoute.get(pathname);
      if (!existsSync(direct) && !existsSync(join(direct, "index.html"))) {
        missing.push(`${route}: ${pathname}`);
        continue;
      }
      if (url.hash && page) {
        const fragment = decodeURIComponent(url.hash.slice(1));
        assert.ok(
          page.html.includes(`id="${fragment}"`),
          `${route}: destino de navegación ${pathname}${url.hash}`,
        );
      }
    }
  }
  assert.deepEqual(missing, []);
});

test("Sitemap cubre todas las páginas indexables y excluye las demás", () => {
  const locations = files
    .filter((file) => /sitemap-\d+\.xml$/.test(file))
    .flatMap((file) =>
      [...readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
        ([, value]) => decodeAttribute(value),
      ),
    );
  assert.ok(locations.length, "Sitemap generado");
  assert.deepEqual(
    [...new Set(locations)].sort(),
    pages.filter((page) => !page.noindex).map((page) => page.canonical).sort(),
  );
  assert.ok(byRoute.get("/404.html")?.noindex);
  const titles = pages.filter((page) => !page.noindex).map((page) => page.html.match(/<title>([^<]+)<\/title>/)[1]);
  assert.equal(new Set(titles).size, titles.length, "Títulos propios por página e idioma");
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

test("Los programas comerciales se publican en los tres idiomas", () => {
  assert.equal(new Set(commercialSlugs).size, commercialSlugs.length);
  for (const prefix of localePrefixes)
    for (const slug of commercialSlugs)
      assert.ok(byRoute.has(`${prefix}/${slug}/`), `Ruta comercial: ${prefix}/${slug}/`);
});

test("El código SENCE se atribuye al curso de portugués y no al inglés hotelero", () => {
  for (const prefix of localePrefixes) {
    for (const slug of ["ingles-para-empresas", "idiomas-para-hoteleria"])
      assert.ok(!byRoute.get(`${prefix}/${slug}/`).html.includes("1238088865"));
    const course = byRoute.get(`${prefix}/portugues-para-negocios/`);
    assert.ok(course.html.includes("1238088865"));
    assert.ok(course.html.includes("https://eligemejor.sence.cl/BuscarCursoNuevo/DetalleCurso?curso=1238088865"));
    const entity = course.jsonLd.flatMap(entities).find((item) => item["@type"] === "Course");
    assert.ok(entity, "Curso identificado en los datos estructurados");
    assert.ok(JSON.stringify(entity.identifier).includes("1238088865"));
    assert.ok(entity.timeRequired === "PT81H" || entity.courseWorkload === "PT81H");
    assert.equal(entity.provider?.["@id"], organizationId);
  }
});

test("Las traducciones comerciales mantienen su estructura y codificación", () => {
  const shape = (value) =>
    Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === "object"
        ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]))
        : typeof value;
  const schema = shape(getCommercialMessages("es"));
  for (const locale of ["es", "en", "pt"]) {
    const messages = getCommercialMessages(locale);
    assert.deepEqual(shape(messages), schema, locale);
    assert.deepEqual(Object.keys(messages.pages).sort(), [...commercialSlugs].sort());
    assert.ok(!/\uFFFD|Ã[\u0080-\u00BF]|Â[\u0080-\u00BF]|â€/.test(JSON.stringify(messages)), `Codificación: ${locale}`);
  }
});
