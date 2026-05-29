import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — AI Notes Summarizer",
  description: "Sign in to your AI Notes Summarizer account",
};

/**
 * Auth layout — shared across login, register, and forgot-password
 * Centered card layout with gradient background
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {children}
      </div>
    </div>
  );
}
