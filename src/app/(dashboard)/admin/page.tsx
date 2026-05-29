"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck, Users, BarChart3, CreditCard, FileText,
  Brain, TrendingUp, Activity, AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const adminStats = [
  { label: "Total Users", value: "10,247", change: "+128 this week", icon: Users, color: "text-violet-400" },
  { label: "AI Generations", value: "89,432", change: "+2,145 today", icon: Brain, color: "text-blue-400" },
  { label: "Revenue (MTD)", value: "$12,840", change: "+23% vs last month", icon: CreditCard, color: "text-emerald-400" },
  { label: "Active Files", value: "45,678", change: "2.3 TB storage", icon: FileText, color: "text-orange-400" },
];

const recentUsers = [
  { name: "Priya Sharma", email: "priya@example.com", plan: "PRO", joined: "2 hours ago" },
  { name: "Arjun Mehta", email: "arjun@example.com", plan: "FREE", joined: "5 hours ago" },
  { name: "Sarah Johnson", email: "sarah@example.com", plan: "PRO", joined: "1 day ago" },
  { name: "Karthik R", email: "karthik@example.com", plan: "TEAM", joined: "2 days ago" },
];

/**
 * Admin dashboard — user management, analytics, revenue
 */
export default function AdminPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-violet-400" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Overview of platform metrics and management</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {adminStats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-emerald-500 mt-2">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-bold text-white">
                  {user.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant={user.plan === "PRO" ? "default" : user.plan === "TEAM" ? "gradient" : "secondary"} className="text-xs">
                  {user.plan}
                </Badge>
                <span className="text-xs text-muted-foreground">{user.joined}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Usage */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Activity className="h-4 w-4" /> AI Model Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { model: "GPT-4o", usage: 45, requests: "40,245", color: "bg-violet-500" },
              { model: "Claude 3.5", usage: 30, requests: "26,830", color: "bg-blue-500" },
              { model: "Gemini Pro", usage: 25, requests: "22,357", color: "bg-emerald-500" },
            ].map((model) => (
              <div key={model.model} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{model.model}</span>
                  <span className="text-muted-foreground">{model.requests} requests ({model.usage}%)</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${model.usage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${model.color}`}
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 text-sm text-amber-500">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">API costs trending 15% above forecast</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
