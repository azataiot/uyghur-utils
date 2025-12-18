/**
 * Uyghur Alphabet Constants
 *
 * The Uyghur language uses Arabic script with additional characters.
 * ULY (Uyghur Latin Yéziqi) is the official Latin alphabet for Uyghur.
 */

/**
 * Uyghur Arabic to Latin (ULY) character mapping
 * Based on the official Uyghur Latin alphabet standard
 */
export const UYGHUR_ARABIC_TO_LATIN: Record<string, string> = {
  // Core Uyghur alphabet (32 letters)
  'ا': 'a',
  'ە': 'e',
  'ب': 'b',
  'پ': 'p',
  'ت': 't',
  'ج': 'j',
  'چ': 'ch',
  'خ': 'x',
  'د': 'd',
  'ر': 'r',
  'ز': 'z',
  'ژ': 'zh',
  'س': 's',
  'ش': 'sh',
  'غ': 'gh',
  'ف': 'f',
  'ق': 'q',
  'ك': 'k',
  'ڭ': 'ng',
  'گ': 'g',
  'ل': 'l',
  'م': 'm',
  'ن': 'n',
  'ھ': 'h',
  'و': 'o',
  'ۇ': 'u',
  'ۆ': 'ö',
  'ۈ': 'ü',
  'ۋ': 'w',
  'ې': 'é',
  'ى': 'i',
  'ي': 'y',
};

/**
 * Latin (ULY) to Uyghur Arabic character mapping
 * Reverse mapping for converting Latin to Arabic script
 */
export const LATIN_TO_UYGHUR_ARABIC: Record<string, string> = {
  'a': 'ا',
  'e': 'ە',
  'b': 'ب',
  'p': 'پ',
  't': 'ت',
  'j': 'ج',
  'ch': 'چ',
  'x': 'خ',
  'd': 'د',
  'r': 'ر',
  'z': 'ز',
  'zh': 'ژ',
  's': 'س',
  'sh': 'ش',
  'gh': 'غ',
  'f': 'ف',
  'q': 'ق',
  'k': 'ك',
  'ng': 'ڭ',
  'g': 'گ',
  'l': 'ل',
  'm': 'م',
  'n': 'ن',
  'h': 'ھ',
  'o': 'و',
  'u': 'ۇ',
  'ö': 'ۆ',
  'ü': 'ۈ',
  'w': 'ۋ',
  'é': 'ې',
  'i': 'ى',
  'y': 'ي',
};

/**
 * Hamza and diacritical marks to remove or handle specially
 */
export const UYGHUR_SPECIAL_CHARS: Record<string, string> = {
  // Hamza (glottal stop marker)
  'ئ': '',
  'ء': '',
  // Arabic diacritics (tashkil) - typically removed
  'ً': '', // Fathatan
  'ٌ': '', // Dammatan
  'ٍ': '', // Kasratan
  'َ': '', // Fatha
  'ُ': '', // Damma
  'ِ': '', // Kasra
  'ّ': '', // Shadda
  'ْ': '', // Sukun
};

/**
 * Arabic-borrowed letters that might appear in Uyghur texts
 * (from Arabic/Persian loanwords)
 */
export const ARABIC_BORROWED_CHARS: Record<string, string> = {
  'ع': '', // Ayn - usually silent or removed
  'ح': 'h', // Haa
  'ط': 't', // Taa
  'ص': 's', // Saad
  'ض': 'z', // Daad
  'ث': 's', // Thaa
  'ذ': 'z', // Dhaal
  'ظ': 'z', // Zhaa
};

/**
 * Arabic-Indic numerals to Western numerals
 */
export const ARABIC_INDIC_NUMERALS: Record<string, string> = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
};

/**
 * Western numerals to Arabic-Indic numerals
 */
export const WESTERN_TO_ARABIC_INDIC_NUMERALS: Record<string, string> = {
  '0': '٠',
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩',
};

/**
 * Extended Arabic-Indic numerals (used in some regions)
 */
export const EXTENDED_ARABIC_INDIC_NUMERALS: Record<string, string> = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

/**
 * Complete mapping for transliteration (Arabic to Latin)
 */
export const COMPLETE_ARABIC_TO_LATIN: Record<string, string> = {
  ...UYGHUR_ARABIC_TO_LATIN,
  ...UYGHUR_SPECIAL_CHARS,
  ...ARABIC_BORROWED_CHARS,
  ...ARABIC_INDIC_NUMERALS,
  ...EXTENDED_ARABIC_INDIC_NUMERALS,
};

/**
 * Uyghur alphabet in Arabic script order
 */
export const UYGHUR_ALPHABET_ARABIC = [
  'ا', 'ە', 'ب', 'پ', 'ت', 'ج', 'چ', 'خ',
  'د', 'ر', 'ز', 'ژ', 'س', 'ش', 'غ', 'ف',
  'ق', 'ك', 'ڭ', 'گ', 'ل', 'م', 'ن', 'ھ',
  'و', 'ۇ', 'ۆ', 'ۈ', 'ۋ', 'ې', 'ى', 'ي',
] as const;

/**
 * Uyghur alphabet in Latin (ULY) order
 */
export const UYGHUR_ALPHABET_LATIN = [
  'a', 'e', 'b', 'p', 't', 'j', 'ch', 'x',
  'd', 'r', 'z', 'zh', 's', 'sh', 'gh', 'f',
  'q', 'k', 'ng', 'g', 'l', 'm', 'n', 'h',
  'o', 'u', 'ö', 'ü', 'w', 'é', 'i', 'y',
] as const;

/**
 * Vowels in Uyghur (Arabic script)
 */
export const UYGHUR_VOWELS_ARABIC = ['ا', 'ە', 'و', 'ۇ', 'ۆ', 'ۈ', 'ې', 'ى'] as const;

/**
 * Vowels in Uyghur (Latin/ULY)
 */
export const UYGHUR_VOWELS_LATIN = ['a', 'e', 'o', 'u', 'ö', 'ü', 'é', 'i'] as const;

/**
 * Consonants in Uyghur (Arabic script)
 */
export const UYGHUR_CONSONANTS_ARABIC = [
  'ب', 'پ', 'ت', 'ج', 'چ', 'خ', 'د', 'ر',
  'ز', 'ژ', 'س', 'ش', 'غ', 'ف', 'ق', 'ك',
  'ڭ', 'گ', 'ل', 'م', 'ن', 'ھ', 'ۋ', 'ي',
] as const;
