"use client";

import { useState, useTransition } from "react";
import { BrainCircuit, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getPerformanceAnalysis, getStudyPlan } from "@/app/actions";
import type { Student } from "@/lib/types";
import type {
  InterpretStudentPerformanceOutput,
  RecommendPersonalizedStudyPlanOutput,
} from "@/ai/flows";

export function StudentView({ student }: { student: Student }) {
  const { toast } = useToast();
  const [isAnalysisPending, startAnalysisTransition] = useTransition();
  const [isPlanPending, startPlanTransition] = useTransition();
  const [analysis, setAnalysis] =
    useState<InterpretStudentPerformanceOutput | null>(null);
  const [studyPlan, setStudyPlan] =
    useState<RecommendPersonalizedStudyPlanOutput | null>(null);

  const handleGetAnalysis = () => {
    startAnalysisTransition(async () => {
      const result = await getPerformanceAnalysis(student);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else {
        setAnalysis(result.data!);
      }
    });
  };

  const handleGetStudyPlan = () => {
    startPlanTransition(async () => {
      const result = await getStudyPlan(student);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else {
        setStudyPlan(result.data!);
      }
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card className="overflow-hidden">
          <CardHeader className="items-center bg-muted/30 p-6">
            <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
              <AvatarImage
                src={student.avatar}
                alt={student.name}
                data-ai-hint="student photo"
              />
              <AvatarFallback className="text-3xl">
                {student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{student.name}</CardTitle>
            <Badge
              variant={
                student.predictedPerformance === "Pass"
                  ? "default"
                  : "destructive"
              }
              className="mt-2 bg-primary"
            >
              Predicted to {student.predictedPerformance}
            </Badge>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Attendance Rate</h4>
              <p className="text-lg font-mono">
                {(student.attendanceRate * 100).toFixed(0)}%
              </p>
            </div>
            <div className="space-y-2 mt-4">
              <h4 className="font-semibold text-sm">Latest Assessment Scores</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {Object.entries(student.assessments).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">
              <BrainCircuit className="mr-2 h-4 w-4" /> Performance Analysis
            </TabsTrigger>
            <TabsTrigger value="study-plan">
              <BookOpen className="mr-2 h-4 w-4" /> Study Plan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Performance Analysis</CardTitle>
                <CardDescription>
                  Understand the key factors influencing your predicted
                  performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!analysis && (
                  <Button
                    onClick={handleGetAnalysis}
                    disabled={isAnalysisPending}
                    className="bg-accent hover:bg-accent/90"
                  >
                    {isAnalysisPending ? "Analyzing..." : "Get AI Analysis"}
                  </Button>
                )}
                {isAnalysisPending && (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                )}
                {analysis && (
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap p-4 bg-muted/50 rounded-md">
                    {analysis.explanation}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="study-plan">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Study Plan</CardTitle>
                <CardDescription>
                  A custom-tailored plan to help you succeed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!studyPlan && (
                  <Button
                    onClick={handleGetStudyPlan}
                    disabled={isPlanPending}
                    className="bg-accent hover:bg-accent/90"
                  >
                    {isPlanPending ? "Generating..." : "Generate Study Plan"}
                  </Button>
                )}
                {isPlanPending && (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                )}
                {studyPlan && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Focus Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {studyPlan.focusAreas.map((area) => (
                          <Badge variant="secondary" key={area}>
                            {area}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        {studyPlan.rationale}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Recommended Study Plan
                      </h4>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap p-4 bg-muted/50 rounded-md">
                        {studyPlan.studyPlan}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
