import type { ChatMessage } from '../types/app';

export const initialMessages: ChatMessage[] = [
{ id: 'm1', role: 'tutor', text: 'Molo Lwazi! I’m your offline tutor. Ask me anything about today’s lesson.' },
{ id: 'm2', role: 'user', text: 'How do I know which numbers to use when factoring?' },
{
  id: 'm3',
  role: 'tutor',
  text: 'Look at x² + bx + c. Find two numbers that multiply to c and add to b. For x² + 5x + 6 that’s 2 and 3.'
}];


export const quickPrompts = ['Explain factoring again', 'Translate to isiXhosa', 'Give me a practice question'];

export const tutorReplies = [
{
  keywords: ['xhosa', 'translate', 'isixhosa'],
  en: 'In isiXhosa: “Fumana amanani amabini aphindaphindeka abe ngu-c aze adityaniswe abe ngu-b.”',
  xh: '“Fumana amanani amabini aphindaphindeka abe ngu-c aze adityaniswe abe ngu-b.”'
},
{
  keywords: ['practice', 'question', 'umbuzo'],
  en: 'Try this: factor x² + 7x + 10. Hint: which two numbers multiply to 10 and add to 7?',
  xh: 'Zama oku: yahlula x² + 7x + 10. Icebiso: ngawaphi amanani amabini aphindaphindeka abe ngu-10 aze adityaniswe abe ngu-7?'
},
{
  keywords: ['factor', 'quadratic', 'explain'],
  en: 'Step 1: write the pattern (x + p)(x + q). Step 2: p × q must equal c. Step 3: p + q must equal b.',
  xh: 'Inyathelo 1: bhala (x + p)(x + q). Inyathelo 2: p × q = c. Inyathelo 3: p + q = b.'
}];


export const fallbackReply = {
  en: 'Good question. I’ve saved it so I can give a fuller answer, and I’ll link it to the right micro-lesson for you.',
  xh: 'Umbuzo omhle. Ndiwugcinile ukuze ndikunike impendulo epheleleyo.'
};