/**
 * uyghur-utils
 *
 * TypeScript utilities for Uyghur language processing
 * - Transliteration (ULY ↔ Arabic script)
 * - Slug generation
 * - Script detection
 * - Text normalization
 * - Number conversion
 *
 * @packageDocumentation
 */

// Transliteration
export {
  toULY,
  toArabic,
  arabicToLatin,
  latinToArabic,
  transliterate,
  type TransliterateOptions,
} from './transliterate';

// Slug generation
export {
  generateSlug,
  slugify,
  isValidSlug,
  sanitizeSlug,
  type SlugOptions,
} from './slug';

// Script detection
export {
  containsArabicScript,
  isPrimarilyArabicScript,
  containsUyghurChars,
  isLikelyUyghur,
  containsLatin,
  containsChinese,
  containsCyrillic,
  detectScript,
  isRTL,
  getTextDirection,
} from './detect';

// Text normalization
export {
  normalizeUyghur,
  removeDiacritics,
  removeHamza,
  normalizeForSearch,
  trimAndNormalize,
  areEquivalent,
} from './normalize';

// Number conversion
export {
  toWesternNumerals,
  toArabicIndicNumerals,
  containsArabicIndicNumerals,
  containsWesternNumerals,
  extractNumbers,
  formatNumber,
  parseNumber,
} from './numbers';

// Constants
export {
  UYGHUR_ARABIC_TO_LATIN,
  LATIN_TO_UYGHUR_ARABIC,
  UYGHUR_ALPHABET_ARABIC,
  UYGHUR_ALPHABET_LATIN,
  UYGHUR_VOWELS_ARABIC,
  UYGHUR_VOWELS_LATIN,
  UYGHUR_CONSONANTS_ARABIC,
  ARABIC_INDIC_NUMERALS,
  WESTERN_TO_ARABIC_INDIC_NUMERALS,
} from './constants';
