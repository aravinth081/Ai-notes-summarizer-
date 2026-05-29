"use client";

import { Sidebar } from "@/components/dashboard/sidebar";

/**
 * Dashboard layout — shared shell for all dashboard pages
 * Contains sidebar + main content area with proper margins
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      {/* Main content area — offset by sidebar width */}
      <main className="lg:pl-[260px] transition-all duration-200">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
