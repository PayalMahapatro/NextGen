"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { AdminView } from "@/components/dashboard/admin-view";
import { TeacherView } from "@/components/dashboard/teacher-view";
import { StudentView } from "@/components/dashboard/student-view";
import { students } from "@/lib/data";
import type { Role } from "@/lib/types";

export function DashboardClient({
  initialRole,
  initialStudentId,
}: {
  initialRole: Role;
  initialStudentId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>(initialRole);
  const [selectedStudentId, setSelectedStudentId] =
    useState<string>(initialStudentId);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", role);
    if (role === "student") {
      params.set("studentId", selectedStudentId);
    } else {
      params.delete("studentId");
    }
    router.replace(`?${params.toString()}`);
  }, [role, selectedStudentId, router, searchParams]);

  const currentStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="flex flex-col h-full">
      <Header
        role={role}
        setRole={setRole}
        selectedStudentId={selectedStudentId}
        setSelectedStudentId={setSelectedStudentId}
        students={students}
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {role === "administrator" && <AdminView students={students} />}
        {role === "teacher" && <TeacherView students={students} />}
        {role === "student" && currentStudent && (
          <StudentView student={currentStudent} />
        )}
      </main>
    </div>
  );
}
