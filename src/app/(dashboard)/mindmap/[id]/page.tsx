"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Sparkles, Network, ZoomIn, ZoomOut, Maximize2,
  BookOpen, HelpCircle, Download, Info, CheckCircle2, RefreshCw,
  Search, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface MindMapNode {
  id: string;
  label: string;
  description: string;
  category: "core" | "concept" | "detail";
  x: number;
  y: number;
  details: string[];
}

const mockNodes: MindMapNode[] = [
  // Level 0 (Core)
  {
    id: "root",
    label: "Data Structures (Unit 3)",
    description: "Trees and Graph fundamentals",
    category: "core",
    x: 350,
    y: 250,
    details: [
      "Covers hierarchical relationships",
      "Main focus: self-balancing trees and graph searches",
      "Major application in database index and network routing"
    ]
  },
  // Level 1 (Concepts)
  {
    id: "binary_trees",
    label: "Binary Trees",
    description: "Hierarchical nodes with ≤ 2 children",
    category: "concept",
    x: 150,
    y: 120,
    details: [
      "Full: 0 or 2 children",
      "Complete: filled level by level from left",
      "Perfect: all levels completely filled",
      "Height balanced: height diff of subtrees ≤ 1"
    ]
  },
  {
    id: "bst",
    label: "Binary Search Trees (BST)",
    description: "Ordered binary tree",
    category: "concept",
    x: 550,
    y: 120,
    details: [
      "Invariant: Left Subtree < Root < Right Subtree",
      "Search time: O(log n) average, O(n) worst case",
      "In-order traversal yields sorted values"
    ]
  },
  {
    id: "avl",
    label: "AVL Trees",
    description: "Self-balancing search tree",
    category: "concept",
    x: 550,
    y: 380,
    details: [
      "Maintains balance factor: |height(left) - height(right)| ≤ 1",
      "Rotations LL, RR (single) and LR, RL (double)",
      "Guarantees O(log n) worst case operations"
    ]
  },
  {
    id: "graphs",
    label: "Graph Structures",
    description: "Vertices and Edges relationships",
    category: "concept",
    x: 150,
    y: 380,
    details: [
      "Represented by Adjacency Matrix or Adjacency List",
      "Directed vs Undirected edges",
      "Weighted edges for shortest path calculations (Dijkstra)"
    ]
  },
  // Level 2 (Details)
  {
    id: "rotations",
    label: "AVL Rotations",
    description: "Tree restructuring operations",
    category: "detail",
    x: 720,
    y: 420,
    details: [
      "LL rotation: Single right rotation at unbalanced ancestor",
      "RR rotation: Single left rotation at unbalanced ancestor",
      "LR rotation: Left rotation at child, then right rotation at ancestor",
      "RL rotation: Right rotation at child, then left rotation at ancestor"
    ]
  },
  {
    id: "traversals",
    label: "Graph Traversals",
    description: "BFS and DFS searches",
    category: "detail",
    x: 60,
    y: 450,
    details: [
      "BFS: uses Queue (FIFO), level-by-level search, finds shortest path",
      "DFS: uses Stack/Recursion (LIFO), depth-first search, topological sort"
    ]
  }
];

const mockConnections = [
  { from: "root", to: "binary_trees" },
  { from: "root", to: "bst" },
  { from: "root", to: "avl" },
  { from: "root", to: "graphs" },
  { from: "avl", to: "rotations" },
  { from: "graphs", to: "traversals" },
];

export default function MindMapPage() {
  const params = useParams();
  const [selectedNode, setSelectedNode] = useState<MindMapNode>(mockNodes[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(true);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerated(true);
    setIsGenerating(false);
    toast.success("Mind Map generated successfully!");
  };

  const handleNodeClick = (node: MindMapNode) => {
    setSelectedNode(node);
  };

  const handleZoom = (direction: "in" | "out" | "reset") => {
    if (direction === "in") setZoomLevel((prev) => Math.min(prev + 0.1, 1.5));
    else if (direction === "out") setZoomLevel((prev) => Math.max(prev - 0.1, 0.7));
    else setZoomLevel(1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link href={`/notes/${params.id}`}>
            <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 hover:bg-accent/40">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="hidden sm:flex items-center gap-2 border-l border-border/40 pl-3">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Network className="h-5 w-5 text-indigo-400" />
              Interactive Concept Mind Map
            </h1>
            <Badge variant="outline" className="text-xs">Unit 3</Badge>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom("out")}
            className="h-8 w-8 p-0"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom("in")}
            className="h-8 w-8 p-0"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom("reset")}
            className="h-8 px-2 text-xs"
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={() => toast.success("Mind Map exported as SVG!")}
          >
            <Download className="h-3.5 w-3.5" /> Export SVG
          </Button>
        </div>
      </div>

      {/* Main Canvas Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 relative overflow-hidden">
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-card border border-border/40 rounded-2xl">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-muted border-t-indigo-500 animate-spin" />
              <Network className="absolute inset-0 m-auto h-6 w-6 text-indigo-400 animate-pulse" />
            </div>
            <h3 className="text-base font-semibold mt-4">Analyzing note structure...</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm text-center">
              Our AI is organizing your notes into conceptual hierarchies and drawing nodes.
            </p>
          </div>
        ) : generated ? (
          <>
            {/* Mind Map Interactive Area */}
            <div className="flex-1 bg-card/40 border border-border/40 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
              {/* Background Graph Grid */}
              <div className="absolute inset-0 grid-pattern opacity-10" />

              {/* Animated Canvas Layer */}
              <motion.div
                className="w-full h-full relative"
                style={{ scale: zoomLevel }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                      <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
                    </linearGradient>
                    <linearGradient id="activeEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Connective Paths */}
                  {mockConnections.map((conn, idx) => {
                    const fromNode = mockNodes.find((n) => n.id === conn.from);
                    const toNode = mockNodes.find((n) => n.id === conn.to);
                    if (!fromNode || !toNode) return null;

                    const isActive = selectedNode.id === fromNode.id || selectedNode.id === toNode.id;

                    // Draw organic bezier curve path
                    const dx = toNode.x - fromNode.x;
                    const dy = toNode.y - fromNode.y;
                    const mx = fromNode.x + dx / 2;
                    const my = fromNode.y + dy / 2;
                    const pathString = `M ${fromNode.x} ${fromNode.y} Q ${mx} ${fromNode.y} ${toNode.x} ${toNode.y}`;

                    return (
                      <g key={idx}>
                        <path
                          d={pathString}
                          fill="none"
                          stroke={isActive ? "url(#activeEdgeGrad)" : "url(#edgeGrad)"}
                          strokeWidth={isActive ? 3 : 1.5}
                          className="transition-all duration-300"
                        />
                        {isActive && (
                          <path
                            d={pathString}
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth={3}
                            strokeDasharray="8 8"
                            className="animate-[dash_10s_linear_infinite]"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Node Cards */}
                {mockNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const categoryStyles = {
                    core: "border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold text-sm shadow-indigo-500/10",
                    concept: "border-violet-500/50 bg-violet-500/5 text-violet-300 font-semibold text-xs",
                    detail: "border-muted bg-card/60 text-muted-foreground text-[11px]",
                  }[node.category];

                  return (
                    <motion.div
                      key={node.id}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl border text-center cursor-pointer transition-all duration-200 glass ${categoryStyles} ${
                        isSelected
                          ? "ring-2 ring-indigo-400 ring-offset-4 ring-offset-background scale-105 shadow-xl shadow-indigo-500/5 border-indigo-400"
                          : "hover:border-indigo-500/40 hover:scale-[1.03]"
                      }`}
                      style={{ left: node.x, top: node.y, width: node.category === "core" ? 180 : 160 }}
                      onClick={() => handleNodeClick(node)}
                    >
                      <h4 className="line-clamp-1">{node.label}</h4>
                      <p className="text-[10px] opacity-70 mt-0.5 line-clamp-1">{node.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Instructions Overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 py-1.5 px-3 rounded-lg border border-border/40 backdrop-blur-sm pointer-events-none">
                <Info className="h-3.5 w-3.5 text-indigo-400" />
                Click nodes to view full concept details
              </div>
            </div>

            {/* Concept Detail Panel Side drawer */}
            <Card className="w-full lg:w-80 shrink-0 flex flex-col border-border/40">
              <CardHeader className="border-b border-border/30 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Concept Inspector</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {selectedNode.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold mt-3 leading-tight">{selectedNode.label}</CardTitle>
                <CardDescription className="text-xs">{selectedNode.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5">Key Core Principles</h4>
                  <div className="space-y-2">
                    {selectedNode.details.map((detail, index) => (
                      <div key={index} className="flex items-start gap-2.5 bg-accent/20 p-2.5 rounded-lg border border-border/10 text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5">Connection Logic</h4>
                  <p className="text-[11px] text-muted-foreground/80 leading-relaxed bg-accent/10 p-2.5 rounded-md">
                    {selectedNode.id === "root" 
                      ? "This is the primary unit root node from which all secondary branches sprout."
                      : `This node connects back to the core ${selectedNode.category === "detail" ? "concept branch" : "unit hierarchy"} to form structured study linkages.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-card border border-border/40 rounded-2xl">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Mind Map Not Yet Generated</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2 text-center">
              Generate a hierarchical concept tree mapping out the structure of your notes.
            </p>
            <Button
              className="mt-6 gap-1.5"
              onClick={handleGenerate}
            >
              <Sparkles className="h-4 w-4" />
              Generate Mind Map
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
