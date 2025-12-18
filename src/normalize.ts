/**
 * Text normalization utilities
 * Normalize Uyghur text for consistent processing
 */

/**
 * Common character variations that should be normalized
 */
const CHAR_NORMALIZATIONS: Record<string, string> = {
  // Different forms of Hamza
  'أ': 'ئا',
  'إ': 'ئا',
  'آ': 'ئا',

  // Arabic Kaf to Uyghur Kaf
  'ک': 'ك',

  // Arabic Yeh variations
  'ی': 'ي',

  // Arabic Heh to Uyghur Heh
  'ه': 'ھ',

  // Zero-width characters (remove)
  '\u200c': '', // ZWNJ
  '\u200d': '', // ZWJ
  '\u200e': '', // LRM
  '\u200f': '', // RLM
  '\ufeff': '', // BOM
};

/**
 * Normalize Uyghur text for consistent processing
 * Handles various character encoding inconsistencies
 *
 * @param text - The text to normalize
 * @returns Normalized text
 *
 * @example
 * ```ts
 * normalizeUyghur('سالام\u200c') // 'سالام' (removes ZWNJ)
 * ```
 */
export function normalizeUyghur(text: string): string {
  if (!text) return '';

  let result = text;

  // Apply Unicode NFC normalization
  result = result.normalize('NFC');

  // Apply character normalizations
  for (const [from, to] of Object.entries(CHAR_NORMALIZATIONS)) {
    result = result.replaceAll(from, to);
  }

  // Normalize whitespace
  result = result.replace(/\s+/g, ' ');

  return result.trim();
}

/**
 * Remove diacritical marks (tashkil/harakat) from Arabic script text
 *
 * @param text - The text to process
 * @returns Text without diacritical marks
 *
 * @example
 * ```ts
 * removeDiacritics('سَلَام') // 'سلام'
 * ```
 */
export function removeDiacritics(text: string): string {
  if (!text) return '';

  // Remove Arabic diacritical marks (U+064B - U+0652)
  return text.replace(/[\u064b-\u0652]/g, '');
}

/**
 * Remove all Hamza characters from text
 * Useful for search normalization
 *
 * @param text - The text to process
 * @returns Text without Hamza
 */
export function removeHamza(text: string): string {
  if (!text) return '';

  return text.replace(/[ئءأإآؤ]/g, '');
}

/**
 * Normalize text for search/comparison purposes
 * More aggressive normalization for fuzzy matching
 *
 * @param text - The text to normalize
 * @returns Search-normalized text
 *
 * @example
 * ```ts
 * normalizeForSearch('ئۇيغۇرچە') // 'ۇيغۇرچە'
 * normalizeForSearch('HELLO') // 'hello'
 * ```
 */
export function normalizeForSearch(text: string): string {
  if (!text) return '';

  let result = normalizeUyghur(text);

  // Remove diacritics
  result = removeDiacritics(result);

  // Remove hamza
  result = removeHamza(result);

  // Lowercase for Latin parts
  result = result.toLowerCase();

  // Remove punctuation
  result = result.replace(/[.,!?;:'"()[\]{}<>«»،؛؟]/g, '');

  // Normalize whitespace
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

/**
 * Trim whitespace and normalize line endings
 *
 * @param text - The text to process
 * @returns Trimmed and normalized text
 */
export function trimAndNormalize(text: string): string {
  if (!text) return '';

  return text
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\r/g, '\n')
    .replace(/^\s+|\s+$/g, '') // Trim
    .replace(/[ \t]+/g, ' ') // Normalize horizontal whitespace
    .replace(/\n{3,}/g, '\n\n'); // Max 2 consecutive newlines
}

/**
 * Check if two texts are equivalent after normalization
 *
 * @param text1 - First text
 * @param text2 - Second text
 * @returns true if texts are equivalent
 */
export function areEquivalent(text1: string, text2: string): boolean {
  return normalizeForSearch(text1) === normalizeForSearch(text2);
}
