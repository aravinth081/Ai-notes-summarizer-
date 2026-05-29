"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText, ArrowLeft, Sparkles, MessageSquare, Layers, CircleDot,
  Network, Volume2, BookOpen, FileEdit, Download, Trash2, Eye,
  Clock, Tag, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const mockNote = {
  id: "1",
  name: "Data Structures - Unit 3",
  type: "PDF",
  size: "2.4 MB",
  pages: 42,
  category: "Computer Science",
  uploadedAt: "2 hours ago",
  content: `# Unit 3: Trees and Graphs

## 3.1 Binary Trees
A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child. Binary trees are used to implement binary search trees and binary heaps.

### Types of Binary Trees:
1. **Full Binary Tree**: Every node has 0 or 2 children
2. **Complete Binary Tree**: All levels are filled except possibly the last
3. **Perfect Binary Tree**: All internal nodes have two children and all leaves are at the same level
4. **Balanced Binary Tree**: Height difference of left and right subtrees is at most 1

## 3.2 Binary Search Trees (BST)
A BST is a binary tree where the left subtree contains only nodes with keys less than the parent node, and the right subtree contains only nodes with keys greater than the parent.

### Operations:
- **Search**: O(log n) average, O(n) worst case
- **Insert**: O(log n) average, O(n) worst case
- **Delete**: O(log n) average, O(n) worst case

## 3.3 AVL Trees
An AVL tree is a self-balancing BST where the heights of the two child subtrees of any node differ by at most one. Rotations are used to maintain balance after insertions and deletions.

## 3.4 Graphs
A graph G = (V, E) consists of a set of vertices V and a set of edges E. Graphs can be directed or undirected, weighted or unweighted.

### Graph Traversals:
- **BFS (Breadth-First Search)**: Uses a queue, explores level by level
- **DFS (Depth-First Search)**: Uses a stack/recursion, explores as deep as possible`,
};

const aiFeatures = [
  { id: "summary", label: "AI Summary", icon: Sparkles, gradient: "from-violet-500 to-purple-600", description: "Generate concise summaries" },
  { id: "2mark", label: "2-Mark Answers", icon: FileEdit, gradient: "from-blue-500 to-cyan-600", description: "Quick exam answers" },
  { id: "16mark", label: "16-Mark Answers", icon: BookOpen, gradient: "from-emerald-500 to-teal-600", description: "Detailed long answers" },
  { id: "mcq", label: "MCQ Quiz", icon: CircleDot, gradient: "from-orange-500 to-amber-600", description: "Auto-generated questions" },
  { id: "flashcards", label: "Flashcards", icon: Layers, gradient: "from-pink-500 to-rose-600", description: "Smart revision cards" },
  { id: "chat", label: "Chat", icon: MessageSquare, gradient: "from-fuchsia-500 to-pink-600", description: "Ask anything about notes" },
  { id: "mindmap", label: "Mind Map", icon: Network, gradient: "from-indigo-500 to-blue-600", description: "Visual concept maps" },
  { id: "voice", label: "Voice Tutor", icon: Volume2, gradient: "from-teal-500 to-emerald-600", description: "Audio explanations" },
];

/**
 * Note detail page — shows note content and all AI feature action cards
 */
export default function NoteDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Back Navigation */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <Link href="/notes">
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Notes
          </Button>
        </Link>
      </motion.div>

      {/* Note Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{mockNote.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge variant="outline">{mockNote.type}</Badge>
              <span className="text-sm text-muted-foreground">{mockNote.size}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{mockNote.pages} pages</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {mockNote.uploadedAt}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </motion.div>

      {/* AI Feature Cards — The main action area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-400" />
          AI-Powered Tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Link
                href={
                  feature.id === "2mark" || feature.id === "16mark"
                    ? `/answers/${params.id}?type=${feature.id}`
                    : `/${feature.id}/${params.id}`
                }
              >
                <Card className="group hover:shadow-lg hover:border-border cursor-pointer transition-all duration-300 h-full">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-3 shadow-lg transition-transform group-hover:scale-110`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold mb-0.5">{feature.label}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Separator className="mb-6" />

      {/* Note Content Tabs */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content" className="gap-1.5">
            <Eye className="h-4 w-4" /> Content
          </TabsTrigger>
          <TabsTrigger value="info" className="gap-1.5">
            <BarChart3 className="h-4 w-4" /> Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {mockNote.content.split("\n").map((line, i) => {
                  if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold mb-4 mt-0">{line.replace("# ", "")}</h1>;
                  if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.replace("## ", "")}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-medium mt-4 mb-2">{line.replace("### ", "")}</h3>;
                  if (line.startsWith("- ")) return <li key={i} className="ml-4 text-muted-foreground">{line.replace("- ", "")}</li>;
                  if (line.match(/^\d+\./)) return <li key={i} className="ml-4 text-muted-foreground list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
                  if (line.trim() === "") return <br key={i} />;
                  return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info">
          <Card>
            <CardContent className="p-6 space-y-4">
              {[
                { label: "File Name", value: mockNote.name },
                { label: "File Type", value: mockNote.type },
                { label: "File Size", value: mockNote.size },
                { label: "Pages", value: `${mockNote.pages}` },
                { label: "Category", value: mockNote.category },
                { label: "Uploaded", value: mockNote.uploadedAt },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
