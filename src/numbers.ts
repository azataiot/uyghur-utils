/**
 * Number conversion utilities
 * Convert between Western numerals and Arabic-Indic numerals
 */

import {
  ARABIC_INDIC_NUMERALS,
  WESTERN_TO_ARABIC_INDIC_NUMERALS,
  EXTENDED_ARABIC_INDIC_NUMERALS,
} from './constants/alphabet';

/**
 * Convert Arabic-Indic numerals to Western numerals
 *
 * @param text - Text containing Arabic-Indic numerals
 * @returns Text with Western numerals
 *
 * @example
 * ```ts
 * toWesternNumerals('٢٠٢٤') // '2024'
 * toWesternNumerals('سال: ٢٠٢٤') // 'سال: 2024'
 * ```
 */
export function toWesternNumerals(text: string): string {
  if (!text) return '';

  let result = text;

  // Replace Arabic-Indic numerals
  for (const [arabic, western] of Object.entries(ARABIC_INDIC_NUMERALS)) {
    result = result.replaceAll(arabic, western);
  }

  // Replace Extended Arabic-Indic numerals (Persian/Urdu style)
  for (const [extended, western] of Object.entries(EXTENDED_ARABIC_INDIC_NUMERALS)) {
    result = result.replaceAll(extended, western);
  }

  return result;
}

/**
 * Convert Western numerals to Arabic-Indic numerals
 *
 * @param text - Text containing Western numerals
 * @returns Text with Arabic-Indic numerals
 *
 * @example
 * ```ts
 * toArabicIndicNumerals('2024') // '٢٠٢٤'
 * toArabicIndicNumerals('Year: 2024') // 'Year: ٢٠٢٤'
 * ```
 */
export function toArabicIndicNumerals(text: string): string {
  if (!text) return '';

  let result = text;

  for (const [western, arabic] of Object.entries(WESTERN_TO_ARABIC_INDIC_NUMERALS)) {
    result = result.replaceAll(western, arabic);
  }

  return result;
}

/**
 * Check if text contains Arabic-Indic numerals
 *
 * @param text - Text to check
 * @returns true if text contains Arabic-Indic numerals
 */
export function containsArabicIndicNumerals(text: string): boolean {
  if (!text) return false;

  const arabicIndicPattern = /[٠-٩۰-۹]/;
  return arabicIndicPattern.test(text);
}

/**
 * Check if text contains Western numerals
 *
 * @param text - Text to check
 * @returns true if text contains Western numerals
 */
export function containsWesternNumerals(text: string): boolean {
  if (!text) return false;
  return /[0-9]/.test(text);
}

/**
 * Extract all numbers from text (as Western numerals)
 *
 * @param text - Text to extract numbers from
 * @returns Array of numbers found in the text
 *
 * @example
 * ```ts
 * extractNumbers('٢٠٢٤-يىل ٥-ئاي') // [2024, 5]
 * extractNumbers('Page 123 of 456') // [123, 456]
 * ```
 */
export function extractNumbers(text: string): number[] {
  if (!text) return [];

  // First convert all numerals to Western
  const westernText = toWesternNumerals(text);

  // Extract all number sequences
  const matches = westernText.match(/\d+/g);

  if (!matches) return [];

  return matches.map((m) => parseInt(m, 10));
}

/**
 * Format a number with the specified numeral system
 *
 * @param num - Number to format
 * @param system - Numeral system ('western' or 'arabic-indic')
 * @returns Formatted number string
 *
 * @example
 * ```ts
 * formatNumber(2024, 'arabic-indic') // '٢٠٢٤'
 * formatNumber(2024, 'western') // '2024'
 * ```
 */
export function formatNumber(
  num: number,
  system: 'western' | 'arabic-indic' = 'western'
): string {
  const str = String(num);

  if (system === 'arabic-indic') {
    return toArabicIndicNumerals(str);
  }

  return str;
}

/**
 * Parse a number from text (handles both numeral systems)
 *
 * @param text - Text containing a number
 * @returns Parsed number or NaN if invalid
 *
 * @example
 * ```ts
 * parseNumber('٢٠٢٤') // 2024
 * parseNumber('2024') // 2024
 * parseNumber('abc') // NaN
 * ```
 */
export function parseNumber(text: string): number {
  if (!text) return NaN;

  const western = toWesternNumerals(text.trim());
  return parseInt(western, 10);
}
