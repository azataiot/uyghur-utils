import { describe, it, expect } from 'vitest';
import {
  // Transliteration
  toULY,
  toArabic,
  transliterate,
  // Slug
  generateSlug,
  isValidSlug,
  // Detection
  containsArabicScript,
  containsUyghurChars,
  isLikelyUyghur,
  detectScript,
  isRTL,
  // Normalization
  normalizeUyghur,
  normalizeForSearch,
  // Numbers
  toWesternNumerals,
  toArabicIndicNumerals,
  extractNumbers,
} from '../src';

describe('Transliteration', () => {
  describe('toULY (Arabic to Latin)', () => {
    it('should transliterate basic Uyghur words', () => {
      expect(toULY('نوزۇگۇم')).toBe('nozugum');
      expect(toULY('سالام')).toBe('salam');
      expect(toULY('دۇنيا')).toBe('dunya');
    });

    it('should handle multi-character mappings', () => {
      expect(toULY('چاي')).toBe('chay');
      expect(toULY('شەھەر')).toBe('sheher');
      expect(toULY('ژۇرنال')).toBe('zhurnal');
    });

    it('should handle vowels correctly', () => {
      expect(toULY('ئۇيغۇر')).toBe('uyghur');
      expect(toULY('ئۆي')).toBe('öy');
      expect(toULY('ئۈچ')).toBe('üch');
    });

    it('should handle empty and null input', () => {
      expect(toULY('')).toBe('');
      expect(toULY(null as unknown as string)).toBe('');
    });

    it('should preserve spaces', () => {
      expect(toULY('سالام دۇنيا')).toBe('salam dunya');
    });
  });

  describe('toArabic (Latin to Arabic)', () => {
    it('should transliterate basic words', () => {
      expect(toArabic('salam')).toBe('سالام');
      expect(toArabic('nozugum')).toBe('نوزۇگۇم');
    });

    it('should handle multi-character sequences', () => {
      expect(toArabic('chay')).toBe('چاي');
      expect(toArabic('sheher')).toBe('شەھەر');
    });

    it('should be case-insensitive', () => {
      expect(toArabic('SALAM')).toBe('سالام');
      expect(toArabic('Salam')).toBe('سالام');
    });
  });

  describe('transliterate (auto-detect)', () => {
    it('should convert Arabic to Latin', () => {
      expect(transliterate('نوزۇگۇم')).toBe('nozugum');
    });

    it('should convert Latin to Arabic', () => {
      expect(transliterate('salam')).toBe('سالام');
    });
  });
});

describe('Slug Generation', () => {
  describe('generateSlug', () => {
    it('should generate slug from English text', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('The Story of Nozugum')).toBe('the-story-of-nozugum');
    });

    it('should generate slug from Uyghur text', () => {
      expect(generateSlug('نوزۇگۇم داستانى')).toBe('nozugum-dastani');
      expect(generateSlug('ئۇيغۇر مەدەنىيىتى')).toBe('uyghur-medeniyiti');
    });

    it('should handle mixed text', () => {
      expect(generateSlug('نوزۇگۇم 2024')).toBe('nozugum-2024');
    });

    it('should respect maxLength option', () => {
      const slug = generateSlug('This is a very long title that should be truncated', {
        maxLength: 20,
      });
      expect(slug.length).toBeLessThanOrEqual(20);
    });

    it('should handle empty input', () => {
      expect(generateSlug('')).toBe('');
      expect(generateSlug(null as unknown as string)).toBe('');
    });
  });

  describe('isValidSlug', () => {
    it('should validate correct slugs', () => {
      expect(isValidSlug('hello-world')).toBe(true);
      expect(isValidSlug('test123')).toBe(true);
      expect(isValidSlug('a')).toBe(true);
    });

    it('should reject invalid slugs', () => {
      expect(isValidSlug('')).toBe(false);
      expect(isValidSlug('-invalid')).toBe(false);
      expect(isValidSlug('invalid-')).toBe(false);
      expect(isValidSlug('UPPERCASE')).toBe(false);
      expect(isValidSlug('has spaces')).toBe(false);
    });
  });
});

describe('Script Detection', () => {
  describe('containsArabicScript', () => {
    it('should detect Arabic script', () => {
      expect(containsArabicScript('نوزۇگۇم')).toBe(true);
      expect(containsArabicScript('Hello')).toBe(false);
      expect(containsArabicScript('Hello نوزۇگۇم')).toBe(true);
    });
  });

  describe('containsUyghurChars', () => {
    it('should detect Uyghur-specific characters', () => {
      expect(containsUyghurChars('نوزۇگۇم')).toBe(true); // Contains ۇ and گ
      expect(containsUyghurChars('مرحبا')).toBe(false); // Arabic without Uyghur chars
    });
  });

  describe('isLikelyUyghur', () => {
    it('should identify Uyghur text', () => {
      expect(isLikelyUyghur('نوزۇگۇم')).toBe(true);
      expect(isLikelyUyghur('Hello')).toBe(false);
    });
  });

  describe('detectScript', () => {
    it('should detect script type', () => {
      expect(detectScript('نوزۇگۇم')).toBe('uyghur');
      expect(detectScript('Hello')).toBe('latin');
      expect(detectScript('你好')).toBe('chinese');
      expect(detectScript('Привет')).toBe('cyrillic');
      expect(detectScript('')).toBe('unknown');
    });

    it('should detect mixed scripts', () => {
      expect(detectScript('Hello نوزۇگۇم')).toBe('mixed');
    });
  });

  describe('isRTL', () => {
    it('should detect RTL text', () => {
      expect(isRTL('نوزۇگۇم داستانى')).toBe(true);
      expect(isRTL('Hello World')).toBe(false);
    });
  });
});

describe('Text Normalization', () => {
  describe('normalizeUyghur', () => {
    it('should normalize whitespace', () => {
      expect(normalizeUyghur('سالام   دۇنيا')).toBe('سالام دۇنيا');
    });

    it('should remove zero-width characters', () => {
      expect(normalizeUyghur('سالام\u200c')).toBe('سالام');
    });
  });

  describe('normalizeForSearch', () => {
    it('should normalize for search comparison', () => {
      expect(normalizeForSearch('ئۇيغۇرچە')).toBe('ۇيغۇرچە');
      expect(normalizeForSearch('HELLO')).toBe('hello');
    });
  });
});

describe('Number Conversion', () => {
  describe('toWesternNumerals', () => {
    it('should convert Arabic-Indic numerals', () => {
      expect(toWesternNumerals('٢٠٢٤')).toBe('2024');
      expect(toWesternNumerals('سال: ٢٠٢٤')).toBe('سال: 2024');
    });
  });

  describe('toArabicIndicNumerals', () => {
    it('should convert Western numerals', () => {
      expect(toArabicIndicNumerals('2024')).toBe('٢٠٢٤');
      expect(toArabicIndicNumerals('Year: 2024')).toBe('Year: ٢٠٢٤');
    });
  });

  describe('extractNumbers', () => {
    it('should extract numbers from text', () => {
      expect(extractNumbers('٢٠٢٤-يىل ٥-ئاي')).toEqual([2024, 5]);
      expect(extractNumbers('Page 123 of 456')).toEqual([123, 456]);
    });
  });
});
