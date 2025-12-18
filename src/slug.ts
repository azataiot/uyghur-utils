/**
 * Slug generation utilities
 * Generates URL-friendly slugs from Uyghur text (Arabic script or Latin)
 */

import { toULY } from './transliterate';
import { containsArabicScript } from './detect';

/**
 * Options for slug generation
 */
export interface SlugOptions {
  /** Maximum length of the slug (default: 100) */
  maxLength?: number;
  /** Character to use as separator (default: '-') */
  separator?: string;
  /** Convert to lowercase (default: true) */
  lowercase?: boolean;
  /** Trim leading/trailing separators (default: true) */
  trim?: boolean;
}

const DEFAULT_OPTIONS: Required<SlugOptions> = {
  maxLength: 100,
  separator: '-',
  lowercase: true,
  trim: true,
};

/**
 * Slugify Latin text
 *
 * @param text - The text to slugify
 * @param options - Slug options
 * @returns URL-friendly slug
 */
function slugifyLatin(text: string, options: Required<SlugOptions>): string {
  let slug = text;

  // Normalize unicode characters
  slug = slug.normalize('NFD');

  // Remove diacritics
  slug = slug.replace(/[\u0300-\u036f]/g, '');

  // Convert to lowercase if specified
  if (options.lowercase) {
    slug = slug.toLowerCase();
  }

  // Replace spaces and special characters with separator
  slug = slug.replace(/\s+/g, options.separator);

  // Remove invalid characters (keep letters, numbers, and separator)
  const separatorRegex = new RegExp(`[^a-z0-9${options.separator}]`, 'gi');
  slug = slug.replace(separatorRegex, '');

  // Remove multiple consecutive separators
  const multiSeparatorRegex = new RegExp(`${options.separator}+`, 'g');
  slug = slug.replace(multiSeparatorRegex, options.separator);

  // Trim separators
  if (options.trim) {
    const trimRegex = new RegExp(`^${options.separator}|${options.separator}$`, 'g');
    slug = slug.replace(trimRegex, '');
  }

  // Truncate if necessary
  if (slug.length > options.maxLength) {
    slug = slug.substring(0, options.maxLength);
    // Try to cut at last separator to avoid cutting words
    const lastSeparator = slug.lastIndexOf(options.separator);
    if (lastSeparator > options.maxLength * 0.7) {
      slug = slug.substring(0, lastSeparator);
    }
  }

  return slug;
}

/**
 * Generate a URL-friendly slug from text
 * Automatically handles Uyghur Arabic script by transliterating to Latin
 *
 * @param text - The text to convert to a slug
 * @param options - Slug generation options
 * @returns URL-friendly slug
 *
 * @example
 * ```ts
 * generateSlug('نوزۇگۇم داستانى') // 'nozugum-dastani'
 * generateSlug('The Story of Nozugum') // 'the-story-of-nozugum'
 * generateSlug('ئۇيغۇر مەدەنىيىتى') // 'uyghur-medeniyiti'
 * ```
 */
export function generateSlug(text: string, options?: SlugOptions): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  let processedText = text.trim();

  // If text contains Arabic script, transliterate to Latin first
  if (containsArabicScript(processedText)) {
    processedText = toULY(processedText);
  }

  return slugifyLatin(processedText, opts);
}

/**
 * Alias for generateSlug
 */
export const slugify = generateSlug;

/**
 * Check if a slug is valid
 * A valid slug contains only lowercase letters, numbers, and hyphens
 *
 * @param slug - The slug to validate
 * @param options - Validation options
 * @returns true if the slug is valid
 *
 * @example
 * ```ts
 * isValidSlug('nozugum-dastani') // true
 * isValidSlug('Hello World') // false
 * isValidSlug('123-test') // true
 * isValidSlug('-invalid-') // false
 * ```
 */
export function isValidSlug(slug: string, options?: { separator?: string }): boolean {
  if (!slug) return false;

  const separator = options?.separator ?? '-';
  const pattern = new RegExp(`^[a-z0-9][a-z0-9${separator}]*[a-z0-9]$|^[a-z0-9]$`);

  return pattern.test(slug);
}

/**
 * Sanitize a slug by removing invalid characters
 *
 * @param slug - The slug to sanitize
 * @param options - Sanitization options
 * @returns Sanitized slug
 */
export function sanitizeSlug(slug: string, options?: SlugOptions): string {
  if (!slug) return '';

  const opts = { ...DEFAULT_OPTIONS, ...options };

  let sanitized = slug;

  if (opts.lowercase) {
    sanitized = sanitized.toLowerCase();
  }

  // Remove invalid characters
  const separatorRegex = new RegExp(`[^a-z0-9${opts.separator}]`, 'gi');
  sanitized = sanitized.replace(separatorRegex, '');

  // Remove multiple consecutive separators
  const multiSeparatorRegex = new RegExp(`${opts.separator}+`, 'g');
  sanitized = sanitized.replace(multiSeparatorRegex, opts.separator);

  // Trim separators
  if (opts.trim) {
    const trimRegex = new RegExp(`^${opts.separator}|${opts.separator}$`, 'g');
    sanitized = sanitized.replace(trimRegex, '');
  }

  return sanitized;
}
