# Bilingual Setup Documentation

## Overview

This Astro site has been configured to support both German (de) and English (en) languages. German is the default language and doesn't use a language prefix, while English uses the `/en/` prefix.

## URL Structure

- **German (default):** `/` (no language prefix)
- **English:** `/en/`
- **Example pages:**
  - German home: `/`
  - English home: `/en/`
  - German workshop: `/workshop`
  - English workshop: `/en/workshop`

## File Structure

### Content Files

```
src/content/pages/
├── home.md          # German content (default)
├── workshop.md      # German content (default)
└── en/
    ├── home.md      # English content
    └── workshop.md  # English content
```

### Page Files

```
src/pages/
├── index.astro      # German home (default)
├── workshop.astro   # German workshop (default)
├── about.astro      # German about (default)
├── contact.astro    # German contact (default)
├── impressum.astro  # German impressum (default)
└── [lang]/
    ├── index.astro      # English home (/en/)
    ├── workshop.astro   # English workshop (/en/workshop)
    ├── about.astro      # English about (/en/about)
    ├── contact.astro    # English contact (/en/contact)
    └── impressum.astro  # English impressum (/en/impressum)
```

## Key Components

### 1. i18n Configuration (`src/i18n/ui.ts`)

- Defines supported languages
- Contains UI translations
- Provides utility functions for language detection

### 2. Language Switcher (Navbar Component)

- Dropdown menu in the navigation
- Automatically detects current language
- Provides links to switch between languages

### 3. Content Management

- German content in root `src/content/pages/`
- English content in `src/content/pages/en/`
- Language field in content frontmatter
- Automatic content loading based on URL language

## How to Add New Content

### 1. Create Content Files

For each language, create a markdown file in the appropriate directory:

**German (default):**

```markdown
---
title: "Page Title"
lang: "de"
sections:
  - type: "text"
    title: "Section Title"
    content: |
      # Markdown content here
---
```

**English:**

```markdown
---
title: "Page Title"
lang: "en"
sections:
  - type: "text"
    title: "Section Title"
    content: |
      # Markdown content here
---
```

### 2. Create Page Component

Create a new page in `src/pages/` for German and `src/pages/[lang]/` for English:

**German page (`src/pages/your-page.astro`):**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getEntryBySlug } from 'astro:content';

const content = await getEntryBySlug('pages', 'your-page');
---
```

**English page (`src/pages/[lang]/your-page.astro`):**

```astro
---
export async function getStaticPaths() {
  return [{ params: { lang: 'en' } }];
}

const { lang } = Astro.params as { lang: string };
const content = await getEntryBySlug('pages', `${lang}/your-page`);
---
```

## Adding New Languages

1. Update `astro.config.mjs`:

```javascript
i18n: {
  defaultLocale: "de",
  locales: ["de", "en", "fr"], // Add new language
  routing: {
    prefixDefaultLocale: false,
  },
},
```

2. Add translations to `src/i18n/ui.ts`:

```typescript
export const ui = {
  de: {
    /* German translations */
  },
  en: {
    /* English translations */
  },
  fr: {
    /* French translations */
  },
} as const;
```

3. Create content directories and files for the new language
4. Update page components to include the new language in `getStaticPaths()`

## Language Detection

The site automatically detects the language from the URL path:

- `/` → German (default)
- `/en/...` → English
- `/fr/...` → French (if added)

## SEO Considerations

- German pages have clean URLs without language prefix
- English pages have `/en/` prefix for clear language identification
- HTML `lang` attribute is automatically set
- Meta descriptions can be language-specific
- Search engines can properly index both language versions

## Development

To run the development server:

```bash
npm run dev
```

The site will be available at:

- German: `http://localhost:4322/`
- English: `http://localhost:4322/en/`
