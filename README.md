# uyghur-utils

TypeScript utilities for Uyghur language processing - transliteration, slug generation, script detection, and more.

[![npm version](https://badge.fury.io/js/uyghur-utils.svg)](https://www.npmjs.com/package/uyghur-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![CI](https://github.com/azataiot/uyghur-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/azataiot/uyghur-utils/actions/workflows/ci.yml)

## Features

- **Transliteration** - Convert between Uyghur Arabic script and ULY (Uyghur Latin Yéziqi)
- **Slug Generation** - Generate URL-friendly slugs from Uyghur text
- **Script Detection** - Detect if text contains Uyghur, Arabic, Latin, Chinese, or Cyrillic
- **Text Normalization** - Normalize Uyghur text for consistent processing
- **Number Conversion** - Convert between Arabic-Indic and Western numerals
- **RTL Support** - Detect text direction for proper rendering

## Installation

```bash
# npm
npm install uyghur-utils

# pnpm
pnpm add uyghur-utils

# yarn
yarn add uyghur-utils
```

## Usage

### Transliteration

Convert between Uyghur Arabic script and Latin (ULY):

```typescript
import { toULY, toArabic, transliterate } from 'uyghur-utils';

// Arabic to Latin (ULY)
toULY('نوزۇگۇم');        // 'nozugum'
toULY('سالام دۇنيا');    // 'salam dunya'
toULY('ئۇيغۇرچە');       // 'uyghurche'

// Latin to Arabic
toArabic('salam');       // 'سالام'
toArabic('nozugum');     // 'نوزۇگۇم'

// Auto-detect and transliterate
transliterate('نوزۇگۇم'); // 'nozugum' (Arabic → Latin)
transliterate('salam');   // 'سالام' (Latin → Arabic)
```

### Slug Generation

Generate URL-friendly slugs:

```typescript
import { generateSlug, slugify, isValidSlug } from 'uyghur-utils';

// From Uyghur text
generateSlug('نوزۇگۇم داستانى');     // 'nozugum-dastani'
generateSlug('ئۇيغۇر مەدەنىيىتى');   // 'uyghur-medeniyiti'

// From English text
generateSlug('The Story of Nozugum'); // 'the-story-of-nozugum'

// With options
generateSlug('Very Long Title Here', { maxLength: 10 }); // 'very-long'

// Validate slugs
isValidSlug('nozugum-dastani'); // true
isValidSlug('Invalid Slug');    // false
```

### Script Detection

Detect the script/language of text:

```typescript
import {
  detectScript,
  containsArabicScript,
  containsUyghurChars,
  isLikelyUyghur,
  isRTL,
  getTextDirection,
} from 'uyghur-utils';

// Detect script type
detectScript('نوزۇگۇم');   // 'uyghur'
detectScript('Hello');     // 'latin'
detectScript('你好');       // 'chinese'
detectScript('Привет');    // 'cyrillic'

// Check for specific scripts
containsArabicScript('نوزۇگۇم'); // true
containsUyghurChars('نوزۇگۇم');  // true (has Uyghur-specific chars)
isLikelyUyghur('نوزۇگۇم');       // true

// RTL detection
isRTL('نوزۇگۇم داستانى');        // true
getTextDirection('نوزۇگۇم');     // 'rtl'
getTextDirection('Hello');       // 'ltr'
```

### Text Normalization

Normalize text for consistent processing:

```typescript
import {
  normalizeUyghur,
  normalizeForSearch,
  removeDiacritics,
  areEquivalent,
} from 'uyghur-utils';

// Basic normalization
normalizeUyghur('سالام\u200c');  // 'سالام' (removes ZWNJ)

// Search normalization (removes hamza, diacritics, punctuation)
normalizeForSearch('ئۇيغۇرچە');  // 'ۇيغۇرچە'

// Compare texts after normalization
areEquivalent('ئۇيغۇر', 'ۇيغۇر'); // true
```

### Number Conversion

Convert between numeral systems:

```typescript
import {
  toWesternNumerals,
  toArabicIndicNumerals,
  extractNumbers,
  formatNumber,
} from 'uyghur-utils';

// Arabic-Indic to Western
toWesternNumerals('٢٠٢٤');         // '2024'
toWesternNumerals('سال: ٢٠٢٤');    // 'سال: 2024'

// Western to Arabic-Indic
toArabicIndicNumerals('2024');     // '٢٠٢٤'

// Extract numbers from text
extractNumbers('٢٠٢٤-يىل ٥-ئاي');  // [2024, 5]

// Format numbers
formatNumber(2024, 'arabic-indic'); // '٢٠٢٤'
```

## API Reference

### Transliteration

| Function | Description |
|----------|-------------|
| `toULY(text)` | Convert Arabic script to Latin (ULY) |
| `toArabic(text)` | Convert Latin (ULY) to Arabic script |
| `transliterate(text)` | Auto-detect and convert |

### Slug Generation

| Function | Description |
|----------|-------------|
| `generateSlug(text, options?)` | Generate URL-friendly slug |
| `slugify(text, options?)` | Alias for generateSlug |
| `isValidSlug(slug)` | Check if slug is valid |
| `sanitizeSlug(slug)` | Clean up a slug |

### Script Detection

| Function | Description |
|----------|-------------|
| `detectScript(text)` | Detect primary script |
| `containsArabicScript(text)` | Check for Arabic script |
| `containsUyghurChars(text)` | Check for Uyghur-specific chars |
| `isLikelyUyghur(text)` | Check if text is likely Uyghur |
| `isRTL(text)` | Check if text is RTL |
| `getTextDirection(text)` | Get 'rtl' or 'ltr' |

### Normalization

| Function | Description |
|----------|-------------|
| `normalizeUyghur(text)` | Basic normalization |
| `normalizeForSearch(text)` | Aggressive search normalization |
| `removeDiacritics(text)` | Remove diacritical marks |
| `removeHamza(text)` | Remove hamza characters |

### Numbers

| Function | Description |
|----------|-------------|
| `toWesternNumerals(text)` | Convert to Western numerals |
| `toArabicIndicNumerals(text)` | Convert to Arabic-Indic |
| `extractNumbers(text)` | Extract all numbers |
| `formatNumber(num, system)` | Format with numeral system |

## Uyghur Alphabet Reference

The Uyghur language uses Arabic script with 32 letters:

| Arabic | Latin (ULY) | Name |
|--------|-------------|------|
| ا | a | Alef |
| ە | e | E |
| ب | b | Be |
| پ | p | Pe |
| ت | t | Te |
| ج | j | Je |
| چ | ch | Che |
| خ | x | Xe |
| د | d | De |
| ر | r | Re |
| ز | z | Ze |
| ژ | zh | Zhe |
| س | s | Se |
| ش | sh | She |
| غ | gh | Ghe |
| ف | f | Fe |
| ق | q | Qe |
| ك | k | Ke |
| ڭ | ng | Nge |
| گ | g | Ge |
| ل | l | Le |
| م | m | Me |
| ن | n | Ne |
| ھ | h | He |
| و | o | O |
| ۇ | u | U |
| ۆ | ö | Ö |
| ۈ | ü | Ü |
| ۋ | w | We |
| ې | é | É |
| ى | i | I |
| ي | y | Ye |

## Contributing

Contributions are welcome! Please follow these guidelines:

### Commit Messages

This project follows the **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** specification.

Format: `<type>(<scope>): <description>`

**Types:**
- `feat`: New feature (triggers minor version bump)
- `fix`: Bug fix (triggers patch version bump)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat: add support for Cyrillic script transliteration
fix(slug): handle empty string input correctly
docs: update API reference for toULY function
test: add edge case tests for number conversion
```

### Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build
pnpm build

# Type check
pnpm typecheck
```

## License

MIT © [azataiot](https://github.com/azataiot)
