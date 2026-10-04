import { Question } from '../types';
import { MPSC_PYQ_2024_PART1 } from './mpscPyq2024_Part1';
import { MPSC_PYQ_2024_PART2 } from './mpscPyq2024_Part2';
import { MPSC_PYQ_2024_PART3 } from './mpscPyq2024_Part3';
import { MPSC_PYQ_2024_PART4 } from './mpscPyq2024_Part4';

// 100 Official Questions: MPSC Maharashtra Gazetted Civil Services Combined Prelims Exam 2024
// (महाराष्ट्र राजपत्रित नागरी सेवा संयुक्त पूर्व परीक्षा - 01 डिसेंबर 2024, पेपर १ - GS)
export const MPSC_PYQ_2024_FULL_100: Question[] = [
  ...MPSC_PYQ_2024_PART1, // Q1 to Q25
  ...MPSC_PYQ_2024_PART2, // Q26 to Q50
  ...MPSC_PYQ_2024_PART3, // Q51 to Q75
  ...MPSC_PYQ_2024_PART4, // Q76 to Q100
];
