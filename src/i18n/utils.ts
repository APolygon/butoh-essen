import { getLangFromUrl } from "./ui";

export function getRelativeLocaleUrl(
  locale: string,
  path: string,
  pathname: string
) {
  const currentLang = getLangFromUrl(new URL(pathname, "http://localhost"));

  // If switching to the same language, return current path
  if (locale === currentLang) {
    return pathname;
  }

  // Get the path without the current language prefix
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  // For German (default), return path without language prefix
  if (locale === "de") {
    return pathWithoutLocale;
  }

  // For English, add language prefix
  return `/${locale}${pathWithoutLocale}`;
}

export function getLocaleFromUrl(pathname: string) {
  const [, lang] = pathname.split("/");
  if (lang === "en") return "en";
  return "de";
}

export function getPathWithoutLocale(pathname: string) {
  const [, lang, ...rest] = pathname.split("/");

  // If the first segment is "en", remove it (German is default, no prefix)
  if (lang === "en") {
    const path = "/" + rest.join("/");
    // Ensure we don't return empty path
    return path === "/" ? "/" : path;
  }

  // If no language prefix or German prefix, return the path as is
  // (German is default, so /de/workshop should become /workshop)
  if (lang === "de") {
    const path = "/" + rest.join("/");
    return path === "/" ? "/" : path;
  }

  // If no language prefix, return the path as is
  return pathname;
}
