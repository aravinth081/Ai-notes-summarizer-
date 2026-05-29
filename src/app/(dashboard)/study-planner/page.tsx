"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, Target, Flame, Plus, CheckCircle2, Circle,
  Trophy, BookOpen, Clock, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const mockTasks = [
  { id: 1, text: "Review Data Structures Unit 3 - Trees", done: true },
  { id: 2, text: "Complete OS Chapter 4 flashcards", done: true },
  { id: 3, text: "Take DBMS MCQ practice quiz", done: false },
  { id: 4, text: "Read Computer Networks Unit 2", done: false },
  { id: 5, text: "Solve 10 previous year questions", done: false },
];

/**
 * Study Planner page — exam countdown, daily tasks, streaks
 */
export default function StudyPlannerPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  const examDate = new Date("2026-06-15");
  const today = new Date();
  const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <CalendarDays className="h-7 w-7 text-cyan-400" />
          Study Planner
        </h1>
        <p className="text-muted-foreground mt-1">Track your progress and stay on schedule</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Exam Countdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
            <CardContent className="p-5 text-center">
              <Clock className="h-8 w-8 text-orange-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-orange-400">{daysLeft}</p>
              <p className="text-sm text-muted-foreground">days until exam</p>
              <p className="text-xs text-muted-foreground mt-1">June 15, 2026</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Study Streak */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent">
            <CardContent className="p-5 text-center">
              <Flame className="h-8 w-8 text-violet-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-violet-400">7</p>
              <p className="text-sm text-muted-foreground">day streak 🔥</p>
              <p className="text-xs text-muted-foreground mt-1">Personal best: 14 days</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <CardContent className="p-5 text-center">
              <Target className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-emerald-400">{Math.round(progress)}%</p>
              <p className="text-sm text-muted-foreground">today&apos;s goals</p>
              <Progress value={progress} className="h-1.5 mt-3" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Tasks */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Today&apos;s Tasks
                </span>
                <Badge variant="secondary" className="text-xs">{completedTasks}/{totalTasks}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${
                    task.done ? "bg-emerald-500/5" : "hover:bg-accent/50"
                  }`}
                >
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <span className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>
                    {task.text}
                  </span>
                </button>
              ))}

              {/* Add Task */}
              <div className="flex gap-2 pt-2">
                <Input
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="text-sm"
                />
                <Button variant="outline" size="icon" onClick={addTask}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Weekly Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: "Monday", hours: 4.5, tasks: 5, completed: 5 },
                  { day: "Tuesday", hours: 3.2, tasks: 4, completed: 4 },
                  { day: "Wednesday", hours: 5.0, tasks: 6, completed: 6 },
                  { day: "Thursday", hours: 2.8, tasks: 3, completed: 3 },
                  { day: "Friday", hours: 4.0, tasks: 5, completed: 4 },
                  { day: "Saturday", hours: 6.5, tasks: 7, completed: 7 },
                  { day: "Sunday", hours: 3.0, tasks: 5, completed: 2 },
                ].map((day) => (
                  <div key={day.day} className="flex items-center gap-3">
                    <span className="text-sm w-20 shrink-0 text-muted-foreground">{day.day.slice(0, 3)}</span>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.hours / 8) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right">{day.hours}h</span>
                    <Badge variant="outline" className="text-xs w-12 justify-center">
                      {day.completed}/{day.tasks}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Weekly Stats */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-border/30">
                <div className="text-center">
                  <p className="text-lg font-bold text-violet-400">29h</p>
                  <p className="text-xs text-muted-foreground">Total Study</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-400">31/35</p>
                  <p className="text-xs text-muted-foreground">Tasks Done</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-orange-400">89%</p>
                  <p className="text-xs text-muted-foreground">Completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
