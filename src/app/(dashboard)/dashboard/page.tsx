"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Upload,
  MessageSquare,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  BarChart3,
  ArrowUpRight,
  Brain,
  CircleDot,
  BookOpen,
  Zap,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatRelativeTime } from "@/lib/utils";

/** Mock data for the dashboard demo */
const stats = [
  {
    label: "Total Notes",
    value: "24",
    change: "+3 this week",
    icon: FileText,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    label: "AI Generations",
    value: "142",
    change: "+28 today",
    icon: Sparkles,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    label: "Chat Messages",
    value: "89",
    change: "+12 today",
    icon: MessageSquare,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    label: "Flashcards",
    value: "356",
    change: "82% mastered",
    icon: Layers,
    gradient: "from-orange-500 to-amber-600",
  },
];

const recentUploads = [
  {
    id: "1",
    name: "Data Structures - Unit 3.pdf",
    type: "PDF",
    size: "2.4 MB",
    date: new Date(Date.now() - 3600000),
    status: "processed",
  },
  {
    id: "2",
    name: "Operating Systems Notes.docx",
    type: "DOCX",
    size: "1.8 MB",
    date: new Date(Date.now() - 7200000),
    status: "processed",
  },
  {
    id: "3",
    name: "Computer Networks - Full Notes.pdf",
    type: "PDF",
    size: "5.1 MB",
    date: new Date(Date.now() - 86400000),
    status: "processed",
  },
  {
    id: "4",
    name: "DBMS Handwritten Notes.jpg",
    type: "IMAGE",
    size: "3.2 MB",
    date: new Date(Date.now() - 172800000),
    status: "processing",
  },
];

const quickActions = [
  { label: "Upload Notes", icon: Upload, href: "/upload", color: "text-violet-400" },
  { label: "AI Summary", icon: Sparkles, href: "/notes", color: "text-blue-400" },
  { label: "Generate MCQs", icon: CircleDot, href: "/notes", color: "text-emerald-400" },
  { label: "Chat with Notes", icon: MessageSquare, href: "/chat", color: "text-orange-400" },
  { label: "Create Flashcards", icon: Layers, href: "/flashcards", color: "text-pink-400" },
  { label: "Study Plan", icon: BookOpen, href: "/study-planner", color: "text-cyan-400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/**
 * Main dashboard page
 * Displays stats, recent uploads, quick actions, and study progress
 */
export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, <span className="gradient-text">Aravind</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your study materials
          </p>
        </div>
        <Link href="/upload">
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            Upload Notes
          </Button>
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="hover:shadow-lg hover:border-border transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4 text-violet-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/40 hover:border-border hover:bg-accent/50 transition-all duration-200 cursor-pointer group">
                      <action.icon className={`h-5 w-5 ${action.color} transition-transform group-hover:scale-110`} />
                      <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                        {action.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Uploads */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Recent Uploads
                  </CardTitle>
                  <Link href="/notes">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentUploads.map((file) => (
                  <Link key={file.id} href={`/notes/${file.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {file.type} · {file.size} · {formatRelativeTime(file.date)}
                        </p>
                      </div>
                      <Badge
                        variant={file.status === "processed" ? "secondary" : "outline"}
                        className="text-xs shrink-0"
                      >
                        {file.status === "processed" ? "✓ Ready" : "⏳ Processing"}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Study Progress & AI Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Study Progress */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  Study Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { subject: "Data Structures", progress: 85, color: "bg-violet-500" },
                  { subject: "Operating Systems", progress: 62, color: "bg-blue-500" },
                  { subject: "Computer Networks", progress: 45, color: "bg-emerald-500" },
                  { subject: "DBMS", progress: 30, color: "bg-orange-500" },
                ].map((subject) => (
                  <div key={subject.subject} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span>{subject.subject}</span>
                      <span className="text-muted-foreground">{subject.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${subject.color}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Usage This Week */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  AI Usage This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Summaries", count: 18, icon: Sparkles, color: "text-violet-400 bg-violet-500/10" },
                    { label: "MCQs Generated", count: 45, icon: CircleDot, color: "text-blue-400 bg-blue-500/10" },
                    { label: "Chat Messages", count: 32, icon: MessageSquare, color: "text-emerald-400 bg-emerald-500/10" },
                    { label: "Flashcards", count: 64, icon: Layers, color: "text-orange-400 bg-orange-500/10" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border/40"
                    >
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-lg font-bold">{item.count}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Weekly streak */}
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🔥</span>
                    <span className="text-sm font-semibold">7 Day Streak!</span>
                  </div>
                  <div className="flex gap-1.5">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div
                        key={`${day}-${i}`}
                        className={`flex-1 h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                          i <= 6
                            ? "bg-violet-500/20 text-violet-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
