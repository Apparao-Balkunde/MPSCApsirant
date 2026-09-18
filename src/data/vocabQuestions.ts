import { Question } from '../types';
import { MARATHI_VOCAB_QUESTIONS } from './marathiVocabQuestions';
import { ENGLISH_VOCAB_QUESTIONS } from './englishVocabQuestions';

export const VOCAB_QUESTIONS_100: Question[] = [
  ...MARATHI_VOCAB_QUESTIONS,
  ...ENGLISH_VOCAB_QUESTIONS,
];
