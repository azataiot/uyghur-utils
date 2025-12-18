/**
 * Script and language detection utilities
 */

/**
 * Unicode ranges for Arabic script
 */
const ARABIC_SCRIPT_RANGES = [
  [0x0600, 0x06ff], // Arabic
  [0x0750, 0x077f], // Arabic Supplement
  [0xfb50, 0xfdff], // Arabic Presentation Forms-A
  [0xfe70, 0xfeff], // Arabic Presentation Forms-B
] as const;

/**
 * Uyghur-specific characters that distinguish it from Arabic/Persian
 */
const UYGHUR_SPECIFIC_CHARS = new Set([
  'ئ', // Hamza on yeh (word-initial vowel marker)
  'ە', // Ae
  'ۆ', // Oe
  'ۈ', // Ue
  'ۋ', // Ve
  'ې', // E
  'ى', // I (different from Arabic ya)
  'ڭ', // Ng
  'گ', // G (with ring)
]);

/**
 * Check if a character is in the Arabic script Unicode range
 */
function isArabicScriptChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return ARABIC_SCRIPT_RANGES.some(([start, end]) => code >= start && code <= end);
}

/**
 * Check if text contains Arabic script characters
 *
 * @param text - The text to check
 * @returns true if text contains Arabic script
 *
 * @example
 * ```ts
 * containsArabicScript('نوزۇگۇم') // true
 * containsArabicScript('Hello') // false
 * containsArabicScript('Hello نوزۇگۇم') // true
 * ```
 */
export function containsArabicScript(text: string): boolean {
  if (!text) return false;
  for (const char of text) {
    if (isArabicScriptChar(char)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if text is primarily Arabic script (more than 50% Arabic characters)
 *
 * @param text - The text to check
 * @returns true if text is primarily Arabic script
 */
export function isPrimarilyArabicScript(text: string): boolean {
  if (!text) return false;

  let arabicCount = 0;
  let totalLetters = 0;

  for (const char of text) {
    if (/\s/.test(char)) continue; // Skip whitespace
    totalLetters++;
    if (isArabicScriptChar(char)) {
      arabicCount++;
    }
  }

  return totalLetters > 0 && arabicCount / totalLetters > 0.5;
}

/**
 * Check if text contains Uyghur-specific characters
 * This helps distinguish Uyghur from Arabic or Persian
 *
 * @param text - The text to check
 * @returns true if text contains Uyghur-specific characters
 *
 * @example
 * ```ts
 * containsUyghurChars('نوزۇگۇم') // true (contains ۇ and گ)
 * containsUyghurChars('مرحبا') // false (Arabic text)
 * ```
 */
export function containsUyghurChars(text: string): boolean {
  if (!text) return false;
  for (const char of text) {
    if (UYGHUR_SPECIFIC_CHARS.has(char)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if text is likely Uyghur language
 * Combines Arabic script detection with Uyghur-specific character detection
 *
 * @param text - The text to check
 * @returns true if text is likely Uyghur
 */
export function isLikelyUyghur(text: string): boolean {
  return containsArabicScript(text) && containsUyghurChars(text);
}

/**
 * Check if text contains Latin characters
 *
 * @param text - The text to check
 * @returns true if text contains Latin characters
 */
export function containsLatin(text: string): boolean {
  if (!text) return false;
  return /[a-zA-Z]/.test(text);
}

/**
 * Check if text contains Chinese characters (CJK Unified Ideographs)
 *
 * @param text - The text to check
 * @returns true if text contains Chinese characters
 */
export function containsChinese(text: string): boolean {
  if (!text) return false;
  return /[\u4e00-\u9fff]/.test(text);
}

/**
 * Check if text contains Cyrillic characters
 *
 * @param text - The text to check
 * @returns true if text contains Cyrillic characters
 */
export function containsCyrillic(text: string): boolean {
  if (!text) return false;
  return /[\u0400-\u04ff]/.test(text);
}

/**
 * Detect the primary script of the text
 *
 * @param text - The text to analyze
 * @returns The detected script type
 *
 * @example
 * ```ts
 * detectScript('نوزۇگۇم') // 'uyghur'
 * detectScript('Hello') // 'latin'
 * detectScript('你好') // 'chinese'
 * detectScript('Привет') // 'cyrillic'
 * ```
 */
export function detectScript(
  text: string
): 'uyghur' | 'arabic' | 'latin' | 'chinese' | 'cyrillic' | 'mixed' | 'unknown' {
  if (!text || text.trim().length === 0) return 'unknown';

  const hasArabic = containsArabicScript(text);
  const hasUyghur = containsUyghurChars(text);
  const hasLatin = containsLatin(text);
  const hasChinese = containsChinese(text);
  const hasCyrillic = containsCyrillic(text);

  // Count how many scripts are present
  const scriptCount = [hasArabic, hasLatin, hasChinese, hasCyrillic].filter(Boolean).length;

  if (scriptCount > 1) return 'mixed';

  if (hasArabic) {
    return hasUyghur ? 'uyghur' : 'arabic';
  }
  if (hasLatin) return 'latin';
  if (hasChinese) return 'chinese';
  if (hasCyrillic) return 'cyrillic';

  return 'unknown';
}

/**
 * Check if text is RTL (right-to-left)
 *
 * @param text - The text to check
 * @returns true if text should be displayed RTL
 */
export function isRTL(text: string): boolean {
  return containsArabicScript(text) && isPrimarilyArabicScript(text);
}

/**
 * Get the recommended text direction for the given text
 *
 * @param text - The text to analyze
 * @returns 'rtl' or 'ltr'
 */
export function getTextDirection(text: string): 'rtl' | 'ltr' {
  return isRTL(text) ? 'rtl' : 'ltr';
}
