export const languages = {
  de: "Deutsch",
  en: "English",
};

export const defaultLang = "de";

export const ui = {
  de: {
    "nav.workshops": "Workshops",
    "nav.contact": "Kontakt",
    "nav.impressum": "Impressum",
    "nav.language": "Sprache",
    "nav.language.de": "Deutsch",
    "nav.language.en": "English",
    "hero.title": "Butoh in Essen",
    "hero.subtitle": "Entdecke die transformative Kraft des Butoh-Tanzes",
    "footer.copyright": "© 2024 Butoh Essen. Alle Rechte vorbehalten.",
    "button.readMore": "Mehr lesen",
    "button.contact": "Kontakt aufnehmen",
    "button.register": "Anmelden",
    "meta.description":
      "Butoh Workshop in Essen - Transformative Tanz-Erfahrung",
  },
  en: {
    "nav.workshops": "Workshops",
    "nav.contact": "Contact",
    "nav.impressum": "Legal Notice",
    "nav.language": "Language",
    "nav.language.de": "Deutsch",
    "nav.language.en": "English",
    "hero.title": "Butoh in Essen",
    "hero.subtitle": "Discover the transformative power of Butoh dance",
    "footer.copyright": "© 2024 Butoh Essen. All rights reserved.",
    "button.readMore": "Read More",
    "button.contact": "Get in Touch",
    "button.register": "Register",
    "meta.description":
      "Butoh Workshop in Essen - Transformative dance experience",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
