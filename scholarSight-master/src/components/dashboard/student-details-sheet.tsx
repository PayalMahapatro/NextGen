"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { StudentView } from "./student-view";
import type { Student } from "@/lib/types";

export function StudentDetailsSheet({
  student,
  onOpenChange,
}: {
  student: Student | null;
  onOpenChange: (open: boolean) => void;
}) {
  const isOpen = !!student;
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl p-0">
        {student && (
          <div className="h-full overflow-y-auto">
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="text-2xl">Student Details</SheetTitle>
              <SheetDescription>
                Comprehensive overview of {student.name}'s academic profile and
                AI-driven insights.
              </SheetDescription>
            </SheetHeader>
            <div className="p-6">
              <StudentView student={student} />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
