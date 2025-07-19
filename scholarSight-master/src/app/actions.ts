"use server";

import {
  interpretStudentPerformance,
  type InterpretStudentPerformanceOutput,
} from "@/ai/flows/interpret-student-performance";
import {
  recommendPersonalizedStudyPlan,
  type RecommendPersonalizedStudyPlanOutput,
} from "@/ai/flows/recommend-personalized-study-plan";
import type { Student } from "@/lib/types";

function formatPreviousGrades(grades: { [key: string]: string }): string {
  return Object.entries(grades)
    .map(([subject, grade]) => `${subject}: ${grade}`)
    .join(", ");
}

export async function getPerformanceAnalysis(
  student: Student
): Promise<{ data?: InterpretStudentPerformanceOutput; error?: string }> {
  try {
    const analysis = await interpretStudentPerformance({
      studentId: student.id,
      assessmentScores: student.assessments,
      attendanceRate: student.attendanceRate,
      previousGrades: student.previousGrades,
      predictedPerformance: student.predictedPerformance,
    });
    return { data: analysis };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "Failed to get performance analysis." };
  }
}

export async function getStudyPlan(
  student: Student
): Promise<{ data?: RecommendPersonalizedStudyPlanOutput; error?: string }> {
  try {
    const plan = await recommendPersonalizedStudyPlan({
      studentId: student.id,
      predictedPerformance: student.predictedPerformance,
      assessmentScores: student.assessments,
      attendanceRate: student.attendanceRate * 100, // Flow expects percentage
      previousAcademicRecords: formatPreviousGrades(student.previousGrades),
    });
    return { data: plan };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "Failed to generate study plan." };
  }
}
