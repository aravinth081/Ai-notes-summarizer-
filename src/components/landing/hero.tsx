"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FileText,
  MessageSquare,
  Layers,
  Zap,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Hero section — the first thing users see
 * Features: gradient mesh bg, animated floating elements, typing effect preview
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [10, -30, 10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-sm border-violet-500/30 bg-violet-500/5 text-violet-400 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-violet-400" />
            Powered by GPT-4, Claude & Gemini
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Transform Your Notes Into{" "}
          <br className="hidden sm:block" />
          <span className="gradient-text">Exam-Ready Materials</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Upload your PDFs, notes, or handwritten pages. Our AI instantly generates
          summaries, flashcards, MCQs, mind maps, and lets you{" "}
          <span className="text-foreground font-medium">chat with your notes</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/register">
            <Button variant="gradient" size="xl" className="group gap-2 min-w-[200px]">
              <Upload className="h-5 w-5" />
              Start for Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="xl" className="gap-2 min-w-[200px]">
              See How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["PS", "AM", "SJ", "KR"].map((initials, i) => (
                <div
                  key={initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-bold text-white"
                  style={{ zIndex: 4 - i }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span>10,000+ students</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1">4.9/5 rating</span>
          </div>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative mx-auto max-w-5xl"
        >
          {/* Glow behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl" />

          {/* Main preview container */}
          <div className="relative glass-strong rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
            {/* Top bar with traffic lights */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                  <Zap className="h-3 w-3 text-violet-400" />
                  app.notesai.com/dashboard
                </div>
              </div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Stats Cards */}
                {[
                  { icon: FileText, label: "Notes Processed", value: "1,247", color: "text-violet-400" },
                  { icon: MessageSquare, label: "AI Conversations", value: "3,891", color: "text-blue-400" },
                  { icon: Layers, label: "Flashcards Created", value: "8,432", color: "text-emerald-400" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/30"
                  >
                    <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock Chat Preview */}
              <div className="rounded-xl bg-muted/20 border border-border/30 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">AI Chat with Notes</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-primary/10 rounded-xl rounded-tr-none px-4 py-2 text-sm max-w-xs">
                      Explain Unit 3: Data Structures and give important questions
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted/50 rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-md text-muted-foreground">
                      <span className="text-foreground font-medium">Unit 3: Data Structures</span> covers arrays, linked lists, stacks, queues, and trees. Key concepts include...
                      <span className="inline-block w-2 h-4 bg-violet-500/60 rounded-sm ml-1 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
