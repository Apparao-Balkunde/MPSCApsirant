/**
 * Universal Question Text Sanitizer for MPSC Questions
 * 
 * Cleans duplicated options blocks that were appended at the end of questionMr / questionEn
 * in historical MPSC exam datasets (e.g. \n(1) ... \n(2) ... \n(3) ... \n(4) ... 
 * or \nपर्यायी उत्तरे:\n(1) ...), ensuring question text displays purely the question prompt
 * and statements without redundant option lists above the interactive option buttons.
 */

export const cleanQuestionText = (text: string | undefined | null): string => {
  if (!text || typeof text !== 'string') return '';

  let cleaned = text;

  // 1. Remove trailing 'पर्यायी उत्तरे' / 'पर्यायी उत्तर' / 'Answer options' / 'Options' block
  // Example: \nपर्यायी उत्तरे:\n(1) ...\n(2) ...\n(3) ...\n(4) ...
  const optionHeaderRegex = /\n\s*(?:पर्यायी उत्तरे\s*:?|पर्यायी उत्तर\s*:?|पर्यायी पर्याय\s*:?|Answer options\s*:?|Answer Options\s*:?|Options\s*:?)\s*\n\s*(?:\(1\)|1\)|1\.|\[1\]|\(a\)|a\))\s*[\s\S]*$/i;
  cleaned = cleaned.replace(optionHeaderRegex, '').trim();

  // 2. Remove trailing numbered option choices at the end of the question text
  // Example: \n(1) फक्त अ, ब, क आणि ड\n(2) फक्त ब, क आणि ई\n(3) फक्त अ, ब, क आणि ई\n(4) वरील सर्व
  const trailingOptionsRegex = /\n\s*(?:\(1\)|1\)|1\.|\[1\])\s+[^\n\r]+(?:\n\s*(?:\(2\)|2\)|2\.|\[2\])\s+[^\n\r]+)(?:\n\s*(?:\(3\)|3\)|3\.|\[3\])\s+[^\n\r]+)?(?:\n\s*(?:\(4\)|4\)|4\.|\[4\])\s+[^\n\r]+)?\s*$/;
  cleaned = cleaned.replace(trailingOptionsRegex, '').trim();

  return cleaned;
};
