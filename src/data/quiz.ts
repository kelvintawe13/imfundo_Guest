import type { QuizQuestion } from '../types/learning';

export const quizMeta = {
  lessonId: 'm1',
  title: 'Solving quadratic equations by factoring',
  subject: 'Mathematics',
  grade: 'Grade 11',
  unit: 'Quadratics · Factoring trinomials',
  objective: 'Factor quadratic expressions and use the factors to solve equations.',
  estimatedMinutes: 4,
  xpPerQuestion: 10,
  comboBonus: 5
};

export const quizQuestions: QuizQuestion[] = [
{
  id: 'q1',
  prompt: 'Factor x² + 5x + 6',
  options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x − 2)(x − 3)', '(x + 5)(x + 1)'],
  answer: 0,
  hint: 'Find two numbers that multiply to 6 and add up to 5.',
  explanation: '2 × 3 = 6 and 2 + 3 = 5, so x² + 5x + 6 = (x + 2)(x + 3).',
  explanationXh: 'Fumana amanani amabini aphindaphindeka abe ngu-6 aze adityaniswe abe ngu-5: ngu-2 no-3.'
},
{
  id: 'q2',
  prompt: 'Solve x² − 9 = 0',
  options: ['x = 9', 'x = 3 only', 'x = ±3', 'x = ±9'],
  answer: 2,
  hint: 'This is a difference of two squares.',
  explanation: 'x² − 9 = (x − 3)(x + 3) = 0, so x = 3 or x = −3.',
  explanationXh: 'Lo ngumahluko wezikwere: (x − 3)(x + 3) = 0, ngoko x = 3 okanye x = −3.'
},
{
  id: 'q3',
  prompt: 'What are the roots of (x − 4)(x + 1) = 0?',
  options: ['x = −4 or x = 1', 'x = 4 or x = −1', 'x = 4 or x = 1', 'x = −4 or x = −1'],
  answer: 1,
  hint: 'If a product equals zero, one of the factors must be zero.',
  explanation: 'Set each factor to zero: x − 4 = 0 gives x = 4, and x + 1 = 0 gives x = −1.',
  explanationXh: 'Ukuba imveliso ingu-0, enye yezinto ingu-0: x − 4 = 0 okanye x + 1 = 0.'
},
{
  id: 'q4',
  prompt: 'Factor 2x² + 7x + 3',
  options: ['(2x + 3)(x + 1)', '(x + 7)(2x + 3)', '(2x + 1)(x + 3)', '(2x − 1)(x − 3)'],
  answer: 2,
  hint: 'Check by expanding each option. The middle term must be 7x.',
  explanation: '(2x + 1)(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3.',
  explanationXh: 'Khangela: (2x + 1)(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3.'
},
{
  id: 'q5',
  prompt: 'A rectangle has area x² + 7x + 12. Its width is (x + 3). What is its length?',
  options: ['(x + 9)', '(x + 4)', '(x + 6)', '(x + 2)'],
  answer: 1,
  hint: 'Factor the area, then remove the width factor.',
  explanation: 'x² + 7x + 12 = (x + 3)(x + 4), so the length is (x + 4).',
  explanationXh: 'x² + 7x + 12 = (x + 3)(x + 4), ngoko ubude bungu-(x + 4).'
}];