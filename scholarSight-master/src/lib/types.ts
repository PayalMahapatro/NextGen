export type Assessment = {
  [key: string]: number;
};

export type PreviousGrades = {
  [key: string]: string;
};

export type Student = {
  id: string;
  name: string;
  avatar: string;
  assessments: Assessment;
  attendanceRate: number;
  previousGrades: PreviousGrades;
  predictedPerformance: "Pass" | "Fail";
};

export type Role = "administrator" | "teacher" | "student";
