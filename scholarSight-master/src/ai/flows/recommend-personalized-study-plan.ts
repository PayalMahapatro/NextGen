// src/ai/flows/recommend-personalized-study-plan.ts
'use server';
/**
 * @fileOverview Provides personalized study plans and focus areas based on performance predictions.
 *
 * - recommendPersonalizedStudyPlan - A function that generates personalized study plans.
 * - RecommendPersonalizedStudyPlanInput - The input type for the recommendPersonalizedStudyPlan function.
 * - RecommendPersonalizedStudyPlanOutput - The return type for the recommendPersonalizedStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPersonalizedStudyPlanInputSchema = z.object({
  studentId: z.string().describe('The unique identifier for the student.'),
  predictedPerformance: z.string().describe('The predicted performance of the student (e.g., Pass, Fail).'),
  assessmentScores: z.record(z.number()).describe('A map of assessment names to scores for the student.'),
  attendanceRate: z.number().describe('The attendance rate of the student (as a percentage).'),
  previousAcademicRecords: z.string().describe('Summary of the student\'s previous academic records.'),
});
export type RecommendPersonalizedStudyPlanInput = z.infer<typeof RecommendPersonalizedStudyPlanInputSchema>;

const RecommendPersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A personalized study plan for the student.'),
  focusAreas: z.array(z.string()).describe('Specific areas where the student should focus their studies.'),
  rationale: z.string().describe('Explanation of why those focus areas were selected.'),
});
export type RecommendPersonalizedStudyPlanOutput = z.infer<typeof RecommendPersonalizedStudyPlanOutputSchema>;

export async function recommendPersonalizedStudyPlan(input: RecommendPersonalizedStudyPlanInput): Promise<RecommendPersonalizedStudyPlanOutput> {
  return recommendPersonalizedStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPersonalizedStudyPlanPrompt',
  input: {schema: RecommendPersonalizedStudyPlanInputSchema},
  output: {schema: RecommendPersonalizedStudyPlanOutputSchema},
  prompt: `You are an AI study plan generator. You will receive the student's predicted performance, assessment scores, attendance rate, and previous academic records.

  Based on this information, you will generate a personalized study plan and identify specific areas where the student should focus their studies to improve their performance.

  Student ID: {{{studentId}}}
  Predicted Performance: {{{predictedPerformance}}}
  Assessment Scores: {{#each assessmentScores}}{{{@key}}}: {{{this}}} {{/each}}
  Attendance Rate: {{{attendanceRate}}}%
  Previous Academic Records: {{{previousAcademicRecords}}}

  Please provide a detailed study plan and a list of focus areas, along with a rationale for why those focus areas were selected.
  Ensure the study plan is practical and actionable, and the focus areas are specific and relevant to the student's needs. Adhere to the output schema strictly.
`,
});

const recommendPersonalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'recommendPersonalizedStudyPlanFlow',
    inputSchema: RecommendPersonalizedStudyPlanInputSchema,
    outputSchema: RecommendPersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
