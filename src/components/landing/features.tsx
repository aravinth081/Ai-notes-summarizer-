"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  FileEdit,
  BookOpen,
  CircleDot,
  Layers,
  Network,
  MessageSquare,
  Volume2,
  CalendarDays,
  Brain,
  Download,
  Shield,
} from "lucide-react";

const iconMap = {
  Sparkles, FileEdit, BookOpen, CircleDot, Layers, Network,
  MessageSquare, Volume2, CalendarDays, Brain, Download, Shield,
};

const features = [
  {
    icon: "Sparkles",
    title: "AI Summaries",
    description: "Generate quick, detailed, or exam-focused summaries. Even a 'one-night-before-exam' mode for crunch time.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: "MessageSquare",
    title: "Chat with Notes",
    description: "Ask questions about your notes like ChatGPT. RAG-powered with citations and streaming responses.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: "Layers",
    title: "Smart Flashcards",
    description: "AI-generated flashcards with spaced repetition. Track your memory score and optimize revision.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: "CircleDot",
    title: "MCQ Generator",
    description: "Auto-generate multiple choice questions with difficulty levels, timed quizzes, and explanations.",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: "FileEdit",
    title: "2 & 16 Mark Answers",
    description: "University-style answers with proper structure, introductions, examples, and conclusions.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: "Network",
    title: "Mind Maps",
    description: "Interactive visual mind maps, concept trees, and flowcharts generated from your notes.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: "Volume2",
    title: "Voice Tutor",
    description: "Listen to AI explanations with text-to-speech. Supports English, Tamil, and Tanglish.",
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    icon: "CalendarDays",
    title: "Study Planner",
    description: "Exam countdown, daily goals, study streaks, and progress analytics to keep you on track.",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    icon: "Brain",
    title: "Question Predictor",
    description: "AI analyzes previous year papers to predict most probable exam questions and high-weight topics.",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    icon: "Download",
    title: "Export Anywhere",
    description: "Export summaries, flashcards, and quiz sheets as PDF, DOCX, or Markdown for offline study.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: "Shield",
    title: "Secure & Private",
    description: "Your notes are encrypted and never shared. Full control over your data with one-click deletion.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: "Sparkles",
    title: "Multi-AI Support",
    description: "Choose between GPT-4, Claude, or Gemini. Switch models anytime for the best results.",
    gradient: "from-violet-500 to-indigo-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

/**
 * Features showcase section
 * 12-card grid with animated gradient icons and staggered reveal
 */
export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-violet-400 uppercase bg-violet-500/10 rounded-full border border-violet-500/20 mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything You Need to{" "}
            <span className="gradient-text">Ace Your Exams</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered summaries to interactive flashcards — our platform has every tool
            a student needs to study smarter, not harder.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative p-5 rounded-xl border border-border/40 bg-card/50 hover:bg-card hover:border-border hover:shadow-lg transition-all duration-300 cursor-default"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                />

                <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-base mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
