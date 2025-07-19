// src/ai/flows/interpret-student-performance.ts
'use server';

/**
 * @fileOverview Provides interpretability for student performance predictions.
 *
 * - interpretStudentPerformance - A function that provides insights into why a student is predicted to be at risk.
 * - InterpretStudentPerformanceInput - The input type for the interpretStudentPerformance function.
 * - InterpretStudentPerformanceOutput - The return type for the interpretStudentPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretStudentPerformanceInputSchema = z.object({
  studentId: z.string().describe('The unique identifier for the student.'),
  assessmentScores: z.record(z.number()).describe('A record of assessment scores for the student.'),
  attendanceRate: z.number().describe('The attendance rate of the student (0 to 1).'),
  previousGrades: z.record(z.string()).describe('A record of the student\'s previous grades.'),
  predictedPerformance: z.string().describe('The predicted performance of the student (e.g., pass/fail).'),
});
export type InterpretStudentPerformanceInput = z.infer<typeof InterpretStudentPerformanceInputSchema>;

const InterpretStudentPerformanceOutputSchema = z.object({
  explanation: z.string().describe('An explanation of the factors influencing the student\'s predicted performance.'),
});
export type InterpretStudentPerformanceOutput = z.infer<typeof InterpretStudentPerformanceOutputSchema>;

export async function interpretStudentPerformance(input: InterpretStudentPerformanceInput): Promise<InterpretStudentPerformanceOutput> {
  return interpretStudentPerformanceFlow(input);
}

const interpretStudentPerformancePrompt = ai.definePrompt({
  name: 'interpretStudentPerformancePrompt',
  input: {schema: InterpretStudentPerformanceInputSchema},
  output: {schema: InterpretStudentPerformanceOutputSchema},
  prompt: `You are an AI expert in student performance analysis. Given the following data for student ID {{{studentId}}}, explain the factors influencing their predicted performance of {{{predictedPerformance}}}. Consider the assessment scores, attendance rate, and previous grades in your analysis.\n\nAssessment Scores: {{{assessmentScores}}}\nAttendance Rate: {{{attendanceRate}}}\nPrevious Grades: {{{previousGrades}}}`, // Updated prompt
});

const interpretStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'interpretStudentPerformanceFlow',
    inputSchema: InterpretStudentPerformanceInputSchema,
    outputSchema: InterpretStudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await interpretStudentPerformancePrompt(input);
    return output!;
  }
);
