# URL Generation Test

## Expected Behavior

### From German (default) to English

- `/` → `/en/`
- `/workshop` → `/en/workshop`
- `/about` → `/en/about`
- `/contact` → `/en/contact`
- `/impressum` → `/en/impressum`

### From English to German (default)

- `/en/` → `/`
- `/en/workshop` → `/workshop`
- `/en/about` → `/about`
- `/en/contact` → `/contact`
- `/en/impressum` → `/impressum`

## Test Cases

### Test 1: Home Page

1. Visit `http://localhost:4322/` (German)
2. Click language dropdown → English
3. Should go to `http://localhost:4322/en/`
4. Click language dropdown → German
5. Should go to `http://localhost:4322/`

### Test 2: Workshop Page

1. Visit `http://localhost:4322/workshop` (German)
2. Click language dropdown → English
3. Should go to `http://localhost:4322/en/workshop`
4. Click language dropdown → German
5. Should go to `http://localhost:4322/workshop`

### Test 3: Multiple Clicks

1. Start at any page
2. Click language dropdown multiple times
3. Should not create malformed URLs like `/en/de/` or `/de/en/`

## Debug Information

Check browser console for debug logs:

```
Switching to en: / → /en/
Switching to de: /en/ → /
Switching to en: /workshop → /en/workshop
Switching to de: /en/workshop → /workshop
```

## Fixed Issues

- ✅ Fixed `getRelativeLocaleUrl` function logic
- ✅ Fixed `getPathWithoutLocale` function to handle both languages
- ✅ Added debug logging for URL generation
- ✅ Simplified URL generation in Navbar component
- ✅ Added proper fallback URLs for SSR
