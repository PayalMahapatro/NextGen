import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { Role } from "@/lib/types";

export default function Home({
  searchParams,
}: {
  searchParams: { role?: Role; studentId?: string };
}) {
  const role = searchParams.role || "teacher";
  const studentId = searchParams.studentId || "s1";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardClient initialRole={role} initialStudentId={studentId} />
    </div>
  );
}
