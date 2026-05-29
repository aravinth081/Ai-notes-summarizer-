import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Notes Summarizer — Transform Notes into Exam-Ready Study Materials",
  description:
    "Upload your notes, PDFs, and handwritten documents. Instantly generate AI summaries, flashcards, MCQs, mind maps, and more. Your personal AI study assistant.",
  keywords: [
    "AI notes summarizer",
    "study tool",
    "exam preparation",
    "flashcards",
    "MCQ generator",
    "AI tutor",
    "PDF summarizer",
    "student productivity",
  ],
  authors: [{ name: "AI Notes Summarizer" }],
  openGraph: {
    title: "AI Notes Summarizer — Your AI Study Assistant",
    description: "Transform notes into exam-ready materials with AI. Summaries, flashcards, MCQs, chat with notes, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Notes Summarizer",
    description: "Transform notes into exam-ready materials with AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
