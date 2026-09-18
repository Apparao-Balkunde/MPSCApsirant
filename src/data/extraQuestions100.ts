import { Question } from '../types';
import { QUESTIONS_SET_3 } from './questionsSet3';
import { QUESTIONS_SET_4 } from './questionsSet4';

export const EXTRA_QUESTIONS_100: Question[] = [
  ...QUESTIONS_SET_3,
  ...QUESTIONS_SET_4,
];
