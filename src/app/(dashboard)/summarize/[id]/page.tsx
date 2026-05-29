"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, Sparkles, Copy, Download, Zap, BookOpen, GraduationCap,
  Moon, Clock, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const summaryModes = [
  { id: "quick", label: "Quick", icon: Zap, description: "Key points in 2 minutes" },
  { id: "detailed", label: "Detailed", icon: BookOpen, description: "Comprehensive overview" },
  { id: "exam", label: "Exam Focus", icon: GraduationCap, description: "Exam-oriented highlights" },
  { id: "night", label: "Last Night", icon: Moon, description: "One-night-before-exam mode" },
];

const mockSummaries: Record<string, string> = {
  quick: `### Quick Summary: Data Structures - Unit 3

**Key Topics Covered:**

• **Binary Trees** — hierarchical data structure, each node has ≤2 children
• **BST** — left < parent < right, enables O(log n) search
• **AVL Trees** — self-balancing BSTs using rotations (LL, RR, LR, RL)
• **Graphs** — G = (V, E), directed/undirected, weighted/unweighted
• **BFS** — level-order traversal using queue, O(V+E)
• **DFS** — depth-first using stack/recursion, O(V+E)

**Must Remember:**
1. BST property: left subtree < root < right subtree
2. AVL balance factor: |height(left) - height(right)| ≤ 1
3. BFS finds shortest path in unweighted graphs
4. DFS used for topological sorting and cycle detection`,

  detailed: `### Detailed Summary: Data Structures - Unit 3

#### 3.1 Binary Trees
A binary tree is a tree data structure in which each node has at most two children. They are fundamental to computer science and form the basis for more complex structures.

**Types of Binary Trees:**
- **Full Binary Tree**: Every node has exactly 0 or 2 children. No node has only one child.
- **Complete Binary Tree**: All levels are completely filled except possibly the last level, which is filled from left to right.
- **Perfect Binary Tree**: All internal nodes have exactly 2 children and all leaf nodes are at the same level. Total nodes = 2^(h+1) - 1.
- **Balanced Binary Tree**: The height difference between left and right subtrees of any node is at most 1.

#### 3.2 Binary Search Trees (BST)
A BST maintains the invariant that for every node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater.

**Operations and Complexity:**
| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| Search    | O(log n)    | O(n)       |
| Insert    | O(log n)    | O(n)       |
| Delete    | O(log n)    | O(n)       |

The worst case occurs when the tree degenerates into a linked list (all nodes have only one child).

#### 3.3 AVL Trees
AVL trees solve the degeneration problem by maintaining balance. After every insertion or deletion, the balance factor of each node is checked, and rotations are performed if necessary.

**Four Types of Rotations:**
1. **LL Rotation** — Right rotation at the unbalanced node
2. **RR Rotation** — Left rotation at the unbalanced node
3. **LR Rotation** — Left rotation at child, then right rotation at node
4. **RL Rotation** — Right rotation at child, then left rotation at node

#### 3.4 Graphs
A graph G = (V, E) consists of vertices (V) and edges (E). Graphs model real-world relationships like networks, maps, and social connections.

**Graph Traversals:**
- **BFS**: Explores all neighbors at the current depth before moving deeper. Uses a queue. Time: O(V+E).
- **DFS**: Explores as deep as possible along each branch before backtracking. Uses a stack or recursion. Time: O(V+E).`,

  exam: `### Exam-Focused Summary: Data Structures - Unit 3

🎯 **HIGH PROBABILITY QUESTIONS:**

**2-Mark Questions:**
1. Define Binary Search Tree with properties
2. What is AVL tree? State balance factor
3. Differentiate BFS and DFS
4. Define complete binary tree vs full binary tree

**16-Mark Questions:**
1. Explain BST operations (Insert, Delete, Search) with examples
2. Explain AVL tree rotations with diagrams
3. Explain BFS and DFS with algorithms and examples
4. Compare different types of binary trees

**Important Formulas:**
- Max nodes in binary tree of height h: 2^(h+1) - 1
- Min height of n nodes: ⌊log₂(n)⌋
- AVL balance factor: height(left) - height(right), must be {-1, 0, 1}

**Diagram Questions (Very Important):**
- BST insertion sequence diagram
- AVL rotation diagrams (LL, RR, LR, RL)
- BFS/DFS traversal order on sample graph`,

  night: `### 🌙 One-Night-Before-Exam Mode

**Read this in 15 minutes and you're covered!**

---

**BINARY TREES** = Each node max 2 children. Full (0 or 2), Complete (filled L→R), Perfect (all leaves same level), Balanced (height diff ≤ 1).

**BST** = Left < Root < Right. Search/Insert/Delete = O(log n) avg. Worst = O(n) when skewed.

**AVL** = Self-balancing BST. Balance factor = -1, 0, or 1. Uses rotations:
- LL → Rotate right
- RR → Rotate left
- LR → Left then right
- RL → Right then left

**GRAPHS** = G(V,E). Directed/Undirected. Weighted/Unweighted.
- **BFS** = Queue → Level by level → Shortest path (unweighted)
- **DFS** = Stack → Go deep → Topological sort, cycle detection

**IF ONLY 5 MINUTES LEFT:**
✅ BST property: left < root < right
✅ AVL = balanced BST, rotations maintain balance
✅ BFS = queue, DFS = stack
✅ Both traversals: O(V+E)
✅ Draw one BST insertion + one AVL rotation

**GOOD LUCK! 🍀**`,
};

/**
 * AI Summary page — generate summaries in different modes
 */
export default function SummarizePage() {
  const params = useParams();
  const [activeMode, setActiveMode] = useState("quick");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<Record<string, boolean>>({ quick: true });

  const handleGenerate = async (mode: string) => {
    setActiveMode(mode);
    if (generated[mode]) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerated((prev) => ({ ...prev, [mode]: true }));
    setIsGenerating(false);
    toast.success("Summary generated!");
  };

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold mt-5 mb-2">{line.replace("### ", "")}</h3>;
      if (line.startsWith("#### ")) return <h4 key={i} className="text-base font-medium mt-4 mb-1.5">{line.replace("#### ", "")}</h4>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold my-2">{line.replace(/\*\*/g, "")}</p>;
      if (line.startsWith("• ") || line.startsWith("- ")) {
        const content = line.replace(/^[•-]\s*/, "");
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        return (
          <li key={i} className="ml-4 list-disc text-sm text-muted-foreground leading-relaxed">
            {parts.map((p, j) => p.startsWith("**") ? <strong key={j} className="text-foreground">{p.replace(/\*\*/g, "")}</strong> : <span key={j}>{p}</span>)}
          </li>
        );
      }
      if (line.match(/^\d+\./)) return <li key={i} className="ml-4 list-decimal text-sm text-muted-foreground">{line.replace(/^\d+\.\s*/, "")}</li>;
      if (line.startsWith("🎯") || line.startsWith("🌙") || line.startsWith("✅")) return <p key={i} className="text-sm my-1">{line}</p>;
      if (line.startsWith("|")) return <p key={i} className="text-sm font-mono text-muted-foreground">{line}</p>;
      if (line.startsWith("---")) return <hr key={i} className="my-4 border-border/30" />;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-sm text-muted-foreground leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <Link href={`/notes/${params.id}`}>
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2">
            <ArrowLeft className="h-4 w-4" /> Back to Note
          </Button>
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-violet-400" />
          AI Summary
        </h1>
        <p className="text-muted-foreground mt-1">Data Structures - Unit 3</p>
      </motion.div>

      {/* Mode Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {summaryModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleGenerate(mode.id)}
            className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              activeMode === mode.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/40 hover:border-border hover:bg-accent/30"
            }`}
          >
            <mode.icon className={`h-5 w-5 mb-2 ${activeMode === mode.id ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-sm font-medium">{mode.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{mode.description}</p>
          </button>
        ))}
      </div>

      {/* Summary Content */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              {generated[activeMode] && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              {summaryModes.find((m) => m.id === activeMode)?.label} Summary
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(mockSummaries[activeMode] || "");
                  toast.success("Copied!");
                }}
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
                <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Generating summary with AI...</p>
            </div>
          ) : generated[activeMode] ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {renderContent(mockSummaries[activeMode] || "")}
            </div>
          ) : (
            <div className="text-center py-16">
              <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Click a summary mode above to generate</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
