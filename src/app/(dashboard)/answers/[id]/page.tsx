"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Sparkles, Copy, Download, FileText, CheckCircle2,
  BookOpen, HelpCircle, FileEdit, Award, ChevronDown, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

interface AnswerItem {
  question: string;
  answer: string;
  marks: 2 | 16;
  keyPoints?: string[];
  structure?: string[];
}

const mock2MarkAnswers: AnswerItem[] = [
  {
    marks: 2,
    question: "Define Binary Search Tree (BST) and state its core invariant.",
    answer: "A Binary Search Tree (BST) is a hierarchical node-based binary tree data structure. Its core invariant is that for any given node, the key in its left child/subtree must be strictly less than the node's key, and the key in its right child/subtree must be strictly greater than the node's key.",
    keyPoints: ["Hierarchical node-based structure", "Left subtree < Node < Right subtree"]
  },
  {
    marks: 2,
    question: "What is an AVL Tree and why is it called self-balancing?",
    answer: "An AVL Tree is a height-balanced Binary Search Tree where the heights of the left and right subtrees of any node differ by at most one. It is self-balancing because it automatically performs rotations (LL, RR, LR, RL) during insertion or deletion if balance factor falls outside {-1, 0, 1}.",
    keyPoints: ["Height-balanced BST", "Max height difference = 1", "Automatic rotations"]
  },
  {
    marks: 2,
    question: "Differentiate between BFS and DFS traversal techniques.",
    answer: "Breadth-First Search (BFS) explores vertices level-by-level using a FIFO Queue and is optimal for finding shortest paths in unweighted graphs. Depth-First Search (DFS) explores as deep as possible along each branch before backtracking, utilizing a LIFO Stack or recursion, and is used for topological sorting.",
    keyPoints: ["BFS: Level-by-level, uses Queue, shortest path", "DFS: Branch-first, uses Stack/recursion, backtracking"]
  },
  {
    marks: 2,
    question: "Explain the Balance Factor in AVL trees mathematically.",
    answer: "The Balance Factor (BF) of a node in an AVL tree is calculated as the difference between the height of its left subtree and the height of its right subtree. Mathematically: BF(node) = height(left_subtree) - height(right_subtree). For a valid AVL tree, BF ∈ {-1, 0, 1}.",
    keyPoints: ["BF = height(left) - height(right)", "Must be -1, 0, or 1"]
  },
  {
    marks: 2,
    question: "What is topological sorting in graphs, and where is it applied?",
    answer: "Topological sorting of a Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u → v, vertex u comes before v. It is widely used in scheduling tasks, project management, and resolving build/dependency orders in compilers.",
    keyPoints: ["Linear ordering for DAGs", "Edge u → v implies u before v", "Used in dependency resolution"]
  }
];

const mock16MarkAnswers: AnswerItem[] = [
  {
    marks: 16,
    question: "Explain the AVL Tree insertion mechanism, detailing all four rotation scenarios with examples.",
    answer: `### Detailed Explanation of AVL Tree Insertion and Rotations

#### 1. Introduction to AVL Trees
An **AVL Tree** (named after Adelson-Velsky and Landis) is a self-balancing Binary Search Tree (BST) where the balance factor of every node is maintained in the range \`[-1, 0, 1]\`. The balance factor (BF) is defined as:
$$\\text{Balance Factor (BF)} = \\text{Height}(\\text{Left Subtree}) - \\text{Height}(\\text{Right Subtree})$$
Maintaining balance ensures that search, insertion, and deletion operations remain bound to $O(\\log n)$ in the worst-case, preventing tree degeneration into a skewed $O(n)$ linked list.

---

#### 2. The AVL Insertion Algorithm
The insertion of a node in an AVL tree follows these sequential steps:
1. **Standard BST Insertion**: Insert the node recursively using standard BST ordering rules (smaller to the left, larger to the right).
2. **Height Update**: Update the height of the current node along the recursion backtracking path.
3. **Balance Calculation**: Calculate the balance factor of the ancestor nodes.
4. **Restructuring (Rotations)**: If any node has a balance factor of $+2$ or $-2$, the tree is unbalanced. Apply one of four rotation techniques depending on the insertion path.

---

#### 3. Four Rebalancing Rotations
To restore balance, we perform one of four types of rotations depending on where the imbalance was introduced:

##### A. Single Left Rotation (LL Imbalance)
- **Scenario**: Node is inserted in the left subtree of the left child of the unbalanced ancestor.
- **Trigger**: Balance Factor of ancestor node $A = +2$, and its left child $B = +1$.
- **Action**: Rotate node $A$ right around $B$. $B$ becomes the new root of the subtree, and $A$ becomes its right child.
- **Complexity**: $O(1)$ pointer manipulations.

##### B. Single Right Rotation (RR Imbalance)
- **Scenario**: Node is inserted in the right subtree of the right child of the unbalanced ancestor.
- **Trigger**: Balance Factor of ancestor node $A = -2$, and its right child $B = -1$.
- **Action**: Rotate node $A$ left around $B$. $B$ becomes the new root of the subtree, and $A$ becomes its left child.

##### C. Left-Right Double Rotation (LR Imbalance)
- **Scenario**: Node is inserted in the right subtree of the left child of the unbalanced ancestor.
- **Trigger**: Balance Factor of ancestor node $A = +2$, and its left child $B = -1$.
- **Action**: First perform a Left Rotation on the left child $B$. This converts the case into an LL imbalance. Then, perform a Right Rotation on the unbalanced ancestor $A$.

##### D. Right-Left Double Rotation (RL Imbalance)
- **Scenario**: Node is inserted in the left subtree of the right child of the unbalanced ancestor.
- **Trigger**: Balance Factor of ancestor node $A = -2$, and its right child $B = +1$.
- **Action**: First perform a Right Rotation on the right child $B$ (converts to RR imbalance). Then, perform a Left Rotation on the unbalanced ancestor $A$.

---

#### 4. Step-by-Step Example: Building an AVL Tree
Let us insert the sequence: **[10, 20, 30]**
1. **Insert 10**: Root node (Height = 0, BF = 0).
2. **Insert 20**: Placed to the right of 10. Height(10) updated to 1. BF(10) = -1.
3. **Insert 30**: Placed to the right of 20. 
   - Heights: Height(30)=0, Height(20)=1, Height(10)=2.
   - Balance Factors: BF(30)=0, BF(20)=-1, BF(10) = 0 - 2 = -2 (Unbalanced!).
   - **Rebalance**: This is an RR imbalance (inserted into right child's right). We perform a Left Rotation on node 10.
   - **Result**: Node 20 becomes the root, with 10 as its left child and 30 as its right child. The tree is now perfectly balanced (BF of all nodes = 0).

---

#### 5. Summary Table of Rotations
| Imbalance Type | Unbalanced Node BF | Child Node BF | Primary Rotation | Secondary Rotation |
|---|---|---|---|---|
| **LL** | $+2$ | $+1$ | Right Rotate Ancestor | None |
| **RR** | $-2$ | $-1$ | Left Rotate Ancestor | None |
| **LR** | $+2$ | $-1$ | Left Rotate Child | Right Rotate Ancestor |
| **RL** | $-2$ | $+1$ | Right Rotate Child | Left Rotate Ancestor |`,
    structure: [
      "1. Introduction to AVL Trees & Balance Factor definition",
      "2. Sequential steps in AVL Insertion Algorithm",
      "3. Detailed breakdown of 4 rotations (LL, RR, LR, RL)",
      "4. Mathematical / Pointer operation complexity",
      "5. Step-by-step tree insertion walk-through example",
      "6. Tabular summary comparison of rotations"
    ]
  },
  {
    marks: 16,
    question: "Provide an exhaustive comparative analysis of Breadth-First Search (BFS) and Depth-First Search (DFS) graph traversal algorithms, including Pseudocode, Data Structures used, and Time/Space Complexities.",
    answer: `### Comparative Analysis: BFS vs DFS Traversals

#### 1. Fundamental Overview
Graph traversal algorithms specify the order in which nodes of a graph are visited. The two foundational approaches are **Breadth-First Search (BFS)** and **Depth-First Search (DFS)**. 

- **BFS** explores the graph level-by-level, visiting all nodes adjacent to a source node before exploring their neighbors. It expands outward like a ripple.
- **DFS** explores as deep as possible along each branch, searching until a dead end is hit, then backtracks to search the next branch.

---

#### 2. Algorithm & Pseudocode

##### Breadth-First Search (BFS)
BFS uses a FIFO (First-In, First-Out) Queue to queue vertices that are visited but whose adjacency list has not been fully explored.

\`\`\`typescript
function BFS(graph: Graph, startNode: Node): void {
  const visited = new Set<Node>();
  const queue: Node[] = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const curr = queue.shift()!;
    console.log("Visited node: " + curr);

    for (const neighbor of graph.getNeighbors(curr)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
\`\`\`

##### Depth-First Search (DFS)
DFS utilizes a LIFO (Last-In, First-Out) Stack, which is naturally simulated by the call stack using recursion.

\`\`\`typescript
function DFS(graph: Graph, startNode: Node): void {
  const visited = new Set<Node>();

  function traverse(node: Node) {
    visited.add(node);
    console.log("Visited node: " + node);

    for (const neighbor of graph.getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  }

  traverse(startNode);
}
\`\`\`

---

#### 3. Core Parameter Comparisons
Below is a structured comparison of the two algorithms:

| Feature / Criteria | Breadth-First Search (BFS) | Depth-First Search (DFS) |
|---|---|---|
| **Data Structure** | FIFO Queue (Iterative) | LIFO Stack (Recursive / Call Stack) |
| **Search Strategy** | Level-by-level (horizontal expansion) | Path-by-path (vertical expansion) |
| **Shortest Path** | Yes, guarantees shortest path for unweighted graphs | No, does not guarantee shortest path |
| **Time Complexity** | $O(V + E)$ where V = vertices, E = edges | $O(V + E)$ |
| **Space Complexity** | $O(V)$ in worst case (broad graphs) | $O(V)$ in worst case (deep skewed paths) |
| **Backtracking** | No backtracking involved | Relies heavily on backtracking |
| **Applications** | Shortest path, web crawlers, GPS navigation | Cycle detection, topological sorting, puzzle solving |

---

#### 4. Time and Space Complexity Analysis

##### Time Complexity: $O(V + E)$
For both BFS and DFS:
- Every vertex $V$ is pushed/enqueued and popped/dequeued exactly once (assuming the graph is fully connected).
- For directed graphs, every edge $E$ is examined once. For undirected graphs, every edge is examined twice.
- Thus, total execution time scales linearly with vertices and edges: $O(V + E)$.

##### Space Complexity: $O(V)$
- **BFS**: In the worst-case (a tree with a single level of children), the queue stores up to $V/2$ nodes. Thus, space complexity is $O(V)$.
- **DFS**: In the worst-case (a single linear path graph), the call stack builds up to $V$ frames. Thus, space complexity is $O(V)$. However, for a balanced tree of depth $D$, space complexity is $O(D)$ or $O(\\log V)$, which is much better than BFS.`,
    structure: [
      "1. Introduction to graph traversal and intuitive description",
      "2. TypeScript pseudocode for BFS showing FIFO Queue logic",
      "3. TypeScript pseudocode for DFS showing recursive LIFO Stack logic",
      "4. Tabular comparison matrix across 8 parameters",
      "5. Rigorous Time and Space complexity analyses with equations",
      "6. Concrete application domains for each traversal"
    ]
  }
];

export default function AnswersPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "16mark" ? "16mark" : "2mark";

  const [activeTab, setActiveTab] = useState<"2mark" | "16mark">(initialType);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<Record<string, boolean>>({
    "2mark": true,
    "16mark": true,
  });

  const handleGenerate = async (type: "2mark" | "16mark") => {
    setActiveTab(type);
    if (generated[type]) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2200));
    setGenerated((prev) => ({ ...prev, [type]: true }));
    setIsGenerating(false);
    toast.success(`${type === "2mark" ? "2-Mark" : "16-Mark"} answers generated!`);
  };

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-lg font-bold text-foreground mt-6 mb-3">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("#### ")) {
        return <h4 key={i} className="text-base font-semibold text-foreground mt-5 mb-2">{line.replace("#### ", "")}</h4>;
      }
      if (line.startsWith("##### ")) {
        return <h5 key={i} className="text-sm font-semibold text-foreground mt-4 mb-2">{line.replace("##### ", "")}</h5>;
      }
      if (line.startsWith("• ") || line.startsWith("- ")) {
        const content = line.replace(/^[•-]\s*/, "");
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        return (
          <li key={i} className="ml-5 list-disc text-sm text-muted-foreground leading-relaxed my-1">
            {parts.map((p, j) => p.startsWith("**") ? <strong key={j} className="text-foreground font-semibold">{p.replace(/\*\*/g, "")}</strong> : <span key={j}>{p}</span>)}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        const content = line.replace(/^\d+\.\s*/, "");
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        return (
          <li key={i} className="ml-5 list-decimal text-sm text-muted-foreground leading-relaxed my-1.5">
            {parts.map((p, j) => p.startsWith("**") ? <strong key={j} className="text-foreground font-semibold">{p.replace(/\*\*/g, "")}</strong> : <span key={j}>{p}</span>)}
          </li>
        );
      }
      if (line.startsWith("|")) {
        return <p key={i} className="text-xs font-mono text-muted-foreground bg-accent/30 py-1 px-2 border-x border-border/40 my-0.5">{line}</p>;
      }
      if (line.startsWith("```")) {
        if (line.trim() === "```" || line.trim() === "```typescript") return null;
        return <p key={i} className="text-xs font-mono text-primary/80 my-1">{line.replace("```", "")}</p>;
      }
      if (line.startsWith("$$") || line.startsWith("\\[")) {
        return <p key={i} className="text-xs font-mono text-violet-400 bg-violet-500/5 py-2 px-3 rounded-lg text-center my-3 border border-violet-500/10">{line.replace(/\$\$/g, "")}</p>;
      }
      if (line.startsWith("---")) return <hr key={i} className="my-6 border-border/30" />;
      if (line.trim() === "") return <br key={i} />;
      
      const parts = line.split(/(\`[^\`]+\`|\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2.5">
          {parts.map((p, j) => {
            if (p.startsWith("`")) return <code key={j} className="text-xs font-mono bg-accent px-1.5 py-0.5 rounded text-primary font-semibold">{p.replace(/\`/g, "")}</code>;
            if (p.startsWith("**")) return <strong key={j} className="text-foreground font-semibold">{p.replace(/\*\*/g, "")}</strong>;
            return <span key={j}>{p}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <Link href={`/notes/${params.id}`}>
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 hover:bg-accent/40">
            <ArrowLeft className="h-4 w-4" /> Back to Note
          </Button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-md">
              <Award className="h-5 w-5 text-white" />
            </div>
            Exam Question Predictor & Answers
          </h1>
          <p className="text-muted-foreground mt-1.5">
            Get instant solutions tailored to standard university exam patterns.
          </p>
        </div>
      </motion.div>

      {/* Selector Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 bg-muted p-1 rounded-xl border border-border/40">
          <button
            onClick={() => handleGenerate("2mark")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === "2mark"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileEdit className="h-4 w-4" />
            2-Mark Answers
          </button>
          <button
            onClick={() => handleGenerate("16mark")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === "16mark"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            16-Mark Answers
          </button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => {
              const fullText = activeTab === "2mark" 
                ? mock2MarkAnswers.map((a) => `Q: ${a.question}\nA: ${a.answer}`).join("\n\n")
                : mock16MarkAnswers.map((a) => `Q: ${a.question}\nA: ${a.answer}`).join("\n\n");
              navigator.clipboard.writeText(fullText);
              toast.success("All answers copied to clipboard!");
            }}
          >
            <Copy className="h-3.5 w-3.5" /> Copy All
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 space-y-4"
          >
            <div className="relative">
              <div className="h-14 w-14 rounded-full border-4 border-muted border-t-cyan-500 animate-spin" />
              <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-cyan-400 animate-pulse" />
            </div>
            <h3 className="text-base font-semibold">AI is drafting answers...</h3>
            <p className="text-xs text-muted-foreground max-w-sm text-center">
              Generating exam-grade points based on your note. This takes a moment.
            </p>
          </motion.div>
        ) : activeTab === "2mark" && generated["2mark"] ? (
          <motion.div
            key="2mark-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {mock2MarkAnswers.map((answer, index) => (
              <Card key={index} className="border-border/40 hover:border-cyan-500/30 transition-all duration-300">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-500 bg-cyan-500/5">
                        Question {index + 1}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">2 Marks</Badge>
                    </div>
                    <CardTitle className="text-base font-bold mt-2 leading-snug">
                      {answer.question}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-accent rounded-lg cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(`Q: ${answer.question}\nA: ${answer.answer}`);
                      toast.success("Question and answer copied!");
                    }}
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed bg-accent/20 p-3.5 rounded-lg border border-border/20">
                    {answer.answer}
                  </p>
                  {answer.keyPoints && (
                    <div className="pt-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Key Revision Points
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {answer.keyPoints.map((kp, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs py-0.5">
                            • {kp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : activeTab === "16mark" && generated["16mark"] ? (
          <motion.div
            key="16mark-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {mock16MarkAnswers.map((answer, index) => (
              <Card key={index} className="border-border/40 hover:border-violet-500/30 transition-all duration-300">
                <CardHeader className="pb-3 border-b border-border/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-violet-500/30 text-violet-500 bg-violet-500/5">
                        Question {index + 1}
                      </Badge>
                      <Badge variant="secondary">16 Marks</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-accent rounded-lg cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(`Q: ${answer.question}\n\n${answer.answer}`);
                        toast.success("Question and answer copied!");
                      }}
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg font-bold mt-3 leading-snug">
                    {answer.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6">
                  {/* Left Column: Outline/Structure */}
                  <div className="lg:col-span-1 border-r border-border/40 pr-4 space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-violet-400" />
                      Answer Structure
                    </h4>
                    <div className="space-y-2">
                      {answer.structure?.map((step, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground/80 leading-relaxed font-medium bg-accent/40 p-2 rounded-lg border border-border/10">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Complete Answer */}
                  <div className="lg:col-span-3 prose prose-sm dark:prose-invert max-w-none pl-2">
                    {renderContent(answer.answer)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-card border border-border/40 rounded-2xl">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Answers Not Yet Drafted</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
              Let the AI process this note to predict exam-style questions and draft high-scoring responses.
            </p>
            <Button
              className="mt-6 gap-1.5"
              onClick={() => handleGenerate(activeTab)}
            >
              <Sparkles className="h-4 w-4" />
              Generate Answers
            </Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
