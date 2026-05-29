"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Brain, FileText, Sparkles, Layers, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Analytics page — study insights and AI usage stats
 */
export default function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-blue-400" /> Analytics
        </h1>
        <p className="text-muted-foreground mt-1">Track your study habits and AI usage</p>
      </motion.div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Study Hours", value: "142h", sub: "This month", icon: Clock, color: "text-violet-400" },
          { label: "Notes Processed", value: "24", sub: "+3 this week", icon: FileText, color: "text-blue-400" },
          { label: "AI Interactions", value: "892", sub: "Total", icon: Brain, color: "text-emerald-400" },
          { label: "Mastery Score", value: "78%", sub: "Across subjects", icon: TrendingUp, color: "text-orange-400" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-5">
                <stat.icon className={`h-5 w-5 mb-3 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-emerald-500 mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity by Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Feature Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { feature: "Summaries", count: 45, max: 50, icon: Sparkles, color: "bg-violet-500" },
              { feature: "Chat Messages", count: 128, max: 150, icon: MessageSquare, color: "bg-blue-500" },
              { feature: "Flashcards", count: 89, max: 100, icon: Layers, color: "bg-emerald-500" },
              { feature: "MCQ Quizzes", count: 23, max: 50, icon: Brain, color: "bg-orange-500" },
            ].map((item) => (
              <div key={item.feature} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted"><item.icon className="h-4 w-4 text-muted-foreground" /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{item.feature}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / item.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Subject Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: "Data Structures", score: 92, quizzes: 8, trend: "up" },
              { subject: "Operating Systems", score: 78, quizzes: 5, trend: "up" },
              { subject: "Computer Networks", score: 65, quizzes: 3, trend: "stable" },
              { subject: "DBMS", score: 45, quizzes: 2, trend: "down" },
            ].map((subject) => (
              <div key={subject.subject} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{subject.quizzes} quizzes</Badge>
                      <span className={`text-sm font-bold ${
                        subject.score >= 80 ? "text-emerald-500" : subject.score >= 60 ? "text-blue-500" : "text-orange-500"
                      }`}>{subject.score}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.score}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full rounded-full ${
                        subject.score >= 80 ? "bg-emerald-500" : subject.score >= 60 ? "bg-blue-500" : "bg-orange-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
