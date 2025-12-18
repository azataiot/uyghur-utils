/**
 * Transliteration utilities for Uyghur
 * Supports bidirectional conversion between Arabic script and ULY (Uyghur Latin Yéziqi)
 */

import {
  COMPLETE_ARABIC_TO_LATIN,
  LATIN_TO_UYGHUR_ARABIC,
} from './constants/alphabet';

/**
 * Transliterate Uyghur text from Arabic script to Latin (ULY)
 *
 * @param text - The Uyghur text in Arabic script
 * @returns The transliterated text in ULY (Latin)
 *
 * @example
 * ```ts
 * toULY('نوزۇگۇم') // 'nozugum'
 * toULY('سالام دۇنيا') // 'salam dunya'
 * toULY('ئۇيغۇرچە') // 'uyghurche'
 * ```
 */
export function toULY(text: string): string {
  if (!text) return '';

  let result = '';

  for (const char of text) {
    const mapped = COMPLETE_ARABIC_TO_LATIN[char];
    if (mapped !== undefined) {
      result += mapped;
    } else if (/\s/.test(char)) {
      result += ' ';
    } else if (/[a-zA-Z0-9]/.test(char)) {
      // Keep existing Latin characters and numbers
      result += char;
    } else if (/[.,!?;:'"()-]/.test(char)) {
      // Keep common punctuation
      result += char;
    }
    // Skip other characters
  }

  // Clean up multiple spaces
  return result.replace(/\s+/g, ' ').trim();
}

/**
 * Alias for toULY - converts Arabic script to Latin
 */
export const arabicToLatin = toULY;

/**
 * Multi-character Latin sequences that map to single Arabic characters
 * Must be checked before single characters
 */
const MULTI_CHAR_LATIN = ['ch', 'zh', 'sh', 'gh', 'ng'] as const;

/**
 * Transliterate Uyghur text from Latin (ULY) to Arabic script
 *
 * @param text - The Uyghur text in ULY (Latin)
 * @returns The transliterated text in Arabic script
 *
 * @example
 * ```ts
 * toArabic('nozugum') // 'نوزۇگۇم'
 * toArabic('salam dunya') // 'سالام دۇنيا'
 * toArabic('uyghurche') // 'ئۇيغۇرچە'
 * ```
 */
export function toArabic(text: string): string {
  if (!text) return '';

  let result = '';
  let i = 0;
  const lowerText = text.toLowerCase();

  while (i < lowerText.length) {
    let matched = false;

    // Check for multi-character sequences first
    for (const seq of MULTI_CHAR_LATIN) {
      if (lowerText.slice(i, i + seq.length) === seq) {
        const mapped = LATIN_TO_UYGHUR_ARABIC[seq];
        if (mapped) {
          result += mapped;
          i += seq.length;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      const char = lowerText[i];
      const mapped = LATIN_TO_UYGHUR_ARABIC[char];

      if (mapped) {
        result += mapped;
      } else if (/\s/.test(char)) {
        result += ' ';
      } else if (/[0-9]/.test(char)) {
        result += char;
      } else if (/[.,!?;:'"()-]/.test(char)) {
        result += char;
      }
      // Skip unmapped characters

      i++;
    }
  }

  return result.trim();
}

/**
 * Alias for toArabic - converts Latin to Arabic script
 */
export const latinToArabic = toArabic;

/**
 * Options for transliteration
 */
export interface TransliterateOptions {
  /** Preserve case in output (only applies to Latin output) */
  preserveCase?: boolean;
  /** Include unmapped characters in output */
  includeUnmapped?: boolean;
}

/**
 * Smart transliteration - automatically detects the script and converts
 *
 * @param text - The text to transliterate
 * @param options - Transliteration options
 * @returns The transliterated text
 *
 * @example
 * ```ts
 * transliterate('نوزۇگۇم') // 'nozugum' (Arabic → Latin)
 * transliterate('nozugum') // 'نوزۇگۇم' (Latin → Arabic)
 * ```
 */
export function transliterate(text: string, _options?: TransliterateOptions): string {
  if (!text) return '';

  // Detect if text is primarily Arabic script
  const hasArabic = /[\u0600-\u06ff\u0750-\u077f\ufb50-\ufdff\ufe70-\ufeff]/.test(text);

  if (hasArabic) {
    return toULY(text);
  } else {
    return toArabic(text);
  }
}
