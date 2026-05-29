"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Layers, ChevronLeft, ChevronRight, RotateCcw,
  Sparkles, CheckCircle2, Brain, Shuffle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockFlashcards = [
  { id: 1, front: "What is a Binary Search Tree (BST)?", back: "A BST is a binary tree where for every node, all values in the left subtree are less than the node, and all values in the right subtree are greater. This enables efficient O(log n) search, insert, and delete operations.", difficulty: 0 },
  { id: 2, front: "What is an AVL Tree?", back: "An AVL tree is a self-balancing Binary Search Tree where the height difference (balance factor) between left and right subtrees of any node is at most 1. It uses rotations (LL, RR, LR, RL) to maintain balance after insertions and deletions.", difficulty: 0 },
  { id: 3, front: "Differentiate BFS and DFS", back: "BFS (Breadth-First Search) uses a queue and explores level by level — good for shortest path. DFS (Depth-First Search) uses a stack/recursion and goes as deep as possible — good for topological sorting and cycle detection. Both have O(V+E) time complexity.", difficulty: 0 },
  { id: 4, front: "What are the four types of AVL rotations?", back: "1. LL Rotation (Right rotation) — left-left imbalance\n2. RR Rotation (Left rotation) — right-right imbalance\n3. LR Rotation (Left-Right) — left child's right subtree\n4. RL Rotation (Right-Left) — right child's left subtree", difficulty: 0 },
  { id: 5, front: "Formula for nodes in a perfect binary tree?", back: "A perfect binary tree of height h has:\n• Total nodes: 2^(h+1) - 1\n• Leaf nodes: 2^h\n• Internal nodes: 2^h - 1\n\nFor example, height 3: 15 total nodes, 8 leaves, 7 internal.", difficulty: 0 },
  { id: 6, front: "What is the time complexity of BST operations?", back: "Average case: O(log n) for search, insert, and delete\nWorst case: O(n) — when tree degenerates to a linked list (skewed tree)\n\nThis worst case is why AVL trees exist — they guarantee O(log n) by maintaining balance.", difficulty: 0 },
];

/**
 * Flashcards page with flip animation, navigation, and progress tracking
 */
export default function FlashcardsPage() {
  const params = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState(0);

  const card = mockFlashcards[currentIndex];
  const progress = (mastered.size / mockFlashcards.length) * 100;

  const goNext = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 150);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((prev) => prev - 1), 150);
    }
  };

  const toggleMastered = () => {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(card.id)) {
        next.delete(card.id);
      } else {
        next.add(card.id);
      }
      return next;
    });
  };

  const shuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * mockFlashcards.length));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
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
          <Layers className="h-6 w-6 text-pink-400" />
          Flashcards
        </h1>
        <p className="text-muted-foreground mt-1">Data Structures - Unit 3</p>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <Progress value={progress} className="flex-1 h-2" />
        <span className="text-sm text-muted-foreground shrink-0">
          {mastered.size}/{mockFlashcards.length} mastered
        </span>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-6">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative cursor-pointer"
            style={{ minHeight: "320px" }}
          >
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="front"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="min-h-[320px] flex items-center justify-center border-2 border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-8 text-center">
                      <Badge variant="outline" className="mb-6 text-xs">
                        {currentIndex + 1} / {mockFlashcards.length}
                      </Badge>
                      <p className="text-xl sm:text-2xl font-semibold leading-relaxed">
                        {card.front}
                      </p>
                      <p className="text-sm text-muted-foreground mt-6">
                        Click to reveal answer
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="min-h-[320px] flex items-center justify-center border-2 border-primary/30 bg-primary/[0.02]">
                    <CardContent className="p-8">
                      <Badge variant="gradient" className="mb-6 text-xs">
                        Answer
                      </Badge>
                      <div className="space-y-2">
                        {card.back.split("\n").map((line, i) => {
                          if (line.startsWith("•") || line.startsWith("-")) {
                            return <li key={i} className="ml-4 list-disc text-sm text-muted-foreground">{line.replace(/^[•-]\s*/, "")}</li>;
                          }
                          if (line.match(/^\d+\./)) {
                            return <li key={i} className="ml-4 list-decimal text-sm text-muted-foreground">{line.replace(/^\d+\.\s*/, "")}</li>;
                          }
                          return <p key={i} className="text-base leading-relaxed">{line}</p>;
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground mt-6 text-center">
                        Click to see question
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="h-10 w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={shuffle}>
            <Shuffle className="h-4 w-4" /> Shuffle
          </Button>
          <Button
            variant={mastered.has(card.id) ? "default" : "outline"}
            size="sm"
            className="gap-1.5"
            onClick={toggleMastered}
          >
            <CheckCircle2 className="h-4 w-4" />
            {mastered.has(card.id) ? "Mastered" : "Mark Mastered"}
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setIsFlipped(false)}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={currentIndex === mockFlashcards.length - 1}
          className="h-10 w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Card Indicators */}
      <div className="flex justify-center gap-1.5 mt-6">
        {mockFlashcards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsFlipped(false); setCurrentIndex(i); }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === currentIndex
                ? "w-6 bg-primary"
                : mastered.has(mockFlashcards[i].id)
                ? "w-2 bg-emerald-500"
                : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
