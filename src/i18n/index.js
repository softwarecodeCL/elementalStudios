import es from "./es.js";
import en from "./en.js";
import pt from "./pt.js";

export const locales = ["es", "en", "pt"];
export const localeInfo = {
  es: { label: "Español", short: "ES", html: "es-CL", og: "es_CL" },
  en: { label: "English", short: "EN", html: "en", og: "en_US" },
  pt: { label: "Português", short: "PT", html: "pt-BR", og: "pt_BR" },
};
export function getLocale(pathname = "/") {
  const prefix = pathname.split("/")[1];
  return prefix === "en" || prefix === "pt" ? prefix : "es";
}
export function unlocalizedPath(path = "/") {
  return path.replace(/^\/(en|pt)(?=\/|$)/, "") || "/";
}
export function localizedPath(locale = "es", path = "/") {
  const neutral = unlocalizedPath(path);
  const [pathname, hash] = neutral.split("#");
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  const base = `${locale === "es" ? "" : `/${locale}`}/${clean ? `${clean}/` : ""}`;
  return `${base}${hash ? `#${hash}` : ""}`;
}
/** @returns {typeof es} */
export function getMessages(locale = "es") {
  return locale === "en" ? en : locale === "pt" ? pt : es;
}
export function formatText(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    String(values[key] ?? `{${key}}`),
  );
}
