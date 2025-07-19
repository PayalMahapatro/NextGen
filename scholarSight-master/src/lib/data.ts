import type { Student } from "@/lib/types";

export const students: Student[] = [
  {
    id: "s1",
    name: "Alice Johnson",
    avatar: "https://placehold.co/40x40.png",
    assessments: { "Midterm Exam": 85, "Final Project": 92, "Quiz 1": 78 },
    attendanceRate: 0.95,
    previousGrades: { Mathematics: "A", Physics: "A-", Literature: "B+" },
    predictedPerformance: "Pass",
  },
  {
    id: "s2",
    name: "Bob Williams",
    avatar: "https://placehold.co/40x40.png",
    assessments: { "Midterm Exam": 62, "Final Project": 55, "Quiz 1": 70 },
    attendanceRate: 0.78,
    previousGrades: { Mathematics: "C+", Physics: "C", Literature: "B-" },
    predictedPerformance: "Fail",
  },
  {
    id: "s3",
    name: "Charlie Brown",
    avatar: "https://placehold.co/40x40.png",
    assessments: { "Midterm Exam": 90, "Final Project": 88, "Quiz 1": 95 },
    attendanceRate: 0.98,
    previousGrades: { Mathematics: "A", Physics: "A", Literature: "A" },
    predictedPerformance: "Pass",
  },
  {
    id: "s4",
    name: "Diana Miller",
    avatar: "https://placehold.co/40x40.png",
    assessments: { "Midterm Exam": 72, "Final Project": 68, "Quiz 1": 75 },
    attendanceRate: 0.85,
    previousGrades: { Mathematics: "B", Physics: "B-", Literature: "B+" },
    predictedPerformance: "Pass",
  },
  {
    id: "s5",
    name: "Ethan Garcia",
    avatar: "https://placehold.co/40x40.png",
    assessments: { "Midterm Exam": 58, "Final Project": 65, "Quiz 1": 60 },
    attendanceRate: 0.91,
    previousGrades: { Mathematics: "C", Physics: "B-", Literature: "C+" },
    predictedPerformance: "Fail",
  },
];
