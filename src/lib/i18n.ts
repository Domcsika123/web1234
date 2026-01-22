import hu from "../locales/hu.json";
import en from "../locales/en.json";
import de from "../locales/de.json";

export type Lang = "hu" | "en" | "de";

const locales = { hu, en, de } as const;

const KEY = "wf_lang";
let current: Lang = "hu";

export function getSavedLang(): Lang {
  const saved = localStorage.getItem(KEY);
  if (saved === "hu" || saved === "en" || saved === "de") return saved;
  return "hu";
}

export function setLang(lang: Lang) {
  current = lang;
  localStorage.setItem(KEY, lang);
  document.documentElement.setAttribute("lang", lang);
}

export function getLang(): Lang {
  return current;
}

export function t(path: string): string {
  const value = getValue(path);
  return typeof value === "string" ? value : path;
}

export function ta<T = unknown>(path: string): T {
  return getValue(path) as T;
}

function getValue(path: string): unknown {
  const parts = path.split(".");
  let value: any = locales[current];
  for (const p of parts) {
    if (value == null) return undefined;
    value = value[p];
  }
  return value;
}
