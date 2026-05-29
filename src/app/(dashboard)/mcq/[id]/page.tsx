"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CircleDot, CheckCircle2, XCircle, Clock, Trophy,
  RotateCcw, ArrowRight, Sparkles, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

const mockQuestions: Question[] = [
  {
    id: 1, question: "What is the time complexity of searching in a balanced BST?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1,
    explanation: "In a balanced BST, each comparison eliminates half of the remaining nodes, giving O(log n) time complexity.",
    difficulty: "easy",
  },
  {
    id: 2, question: "Which data structure does BFS use?",
    options: ["Stack", "Queue", "Priority Queue", "Deque"], correct: 1,
    explanation: "BFS uses a queue to explore nodes level by level, ensuring the nearest neighbors are visited first.",
    difficulty: "easy",
  },
  {
    id: 3, question: "What is the balance factor range of an AVL tree?",
    options: ["{0, 1}", "{-1, 0, 1}", "{-2, -1, 0, 1, 2}", "{-1, 1}"], correct: 1,
    explanation: "In an AVL tree, the balance factor (height of left subtree minus height of right subtree) must be -1, 0, or 1 for every node.",
    difficulty: "medium",
  },
  {
    id: 4, question: "In a perfect binary tree with height h, how many total nodes are there?",
    options: ["2^h", "2^h - 1", "2^(h+1) - 1", "h²"], correct: 2,
    explanation: "A perfect binary tree of height h has 2^(h+1) - 1 nodes. For h=0 (root only), that's 2^1 - 1 = 1 node.",
    difficulty: "medium",
  },
  {
    id: 5, question: "Which rotation is needed when a node is inserted in the right subtree of the left child of an unbalanced node?",
    options: ["LL Rotation", "RR Rotation", "LR Rotation", "RL Rotation"], correct: 2,
    explanation: "LR (Left-Right) rotation is needed: first a left rotation on the child, then a right rotation on the unbalanced node.",
    difficulty: "hard",
  },
];

type QuizState = "start" | "quiz" | "result";

/**
 * MCQ Quiz page with timer, scoring, explanations, and result summary
 */
export default function MCQPage() {
  const params = useParams();
  const [state, setState] = useState<QuizState>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (state !== "quiz" || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { setState("result"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    setShowExplanation(true);
    const isCorrect = optionIndex === mockQuestions[currentQ].correct;
    if (isCorrect) setScore((prev) => prev + 1);
    setAnswers((prev) => [...prev, optionIndex]);
  };

  const handleNext = () => {
    if (currentQ < mockQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setState("result");
    }
  };

  const resetQuiz = () => {
    setState("start");
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(300);
    setShowExplanation(false);
  };

  const question = mockQuestions[currentQ];
  const percentage = Math.round((score / mockQuestions.length) * 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <Link href={`/notes/${params.id}`}>
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2">
            <ArrowLeft className="h-4 w-4" /> Back to Note
          </Button>
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Start Screen */}
        {state === "start" && (
          <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-6 shadow-xl">
              <CircleDot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">MCQ Quiz</h1>
            <p className="text-muted-foreground mb-2">Data Structures - Unit 3</p>
            <div className="flex justify-center gap-4 mb-8 text-sm text-muted-foreground">
              <span>{mockQuestions.length} questions</span>
              <span>·</span>
              <span>5 minutes</span>
              <span>·</span>
              <span>Mixed difficulty</span>
            </div>
            <Button variant="gradient" size="xl" className="gap-2" onClick={() => setState("quiz")}>
              <Sparkles className="h-5 w-5" /> Start Quiz
            </Button>
          </motion.div>
        )}

        {/* Quiz Screen */}
        {state === "quiz" && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {/* Timer & Progress */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Q {currentQ + 1}/{mockQuestions.length}</span>
                <Badge variant={question.difficulty === "easy" ? "secondary" : question.difficulty === "medium" ? "outline" : "destructive"} className="text-xs capitalize">
                  {question.difficulty}
                </Badge>
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-mono ${timeLeft < 60 ? "text-red-400" : "text-muted-foreground"}`}>
                <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
              </div>
            </div>
            <Progress value={((currentQ + 1) / mockQuestions.length) * 100} className="h-1.5 mb-6" />

            {/* Question */}
            <Card className="mb-4">
              <CardContent className="p-6">
                <p className="text-lg font-medium mb-6">{question.question}</p>
                <div className="space-y-3">
                  {question.options.map((option, i) => {
                    let style = "border-border/50 hover:border-primary/50 hover:bg-accent/30";
                    if (answered) {
                      if (i === question.correct) style = "border-emerald-500 bg-emerald-500/10";
                      else if (i === selected && i !== question.correct) style = "border-red-500 bg-red-500/10";
                      else style = "border-border/30 opacity-50";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={answered}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${style}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                          {answered && i === question.correct ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> :
                           answered && i === selected ? <XCircle className="h-5 w-5 text-red-500" /> :
                           String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4">
                  <Card className="border-violet-500/30 bg-violet-500/5">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-1 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-violet-400" /> Explanation
                      </p>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button onClick={handleNext} variant="gradient" className="w-full gap-2">
                  {currentQ < mockQuestions.length - 1 ? <>Next Question <ArrowRight className="h-4 w-4" /></> : <>View Results <Trophy className="h-4 w-4" /></>}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Results Screen */}
        {state === "result" && (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 mb-6 shadow-xl">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-5xl font-bold gradient-text mb-2">{percentage}%</p>
            <p className="text-muted-foreground mb-8">{score} out of {mockQuestions.length} correct</p>

            {/* Answer Review */}
            <Card className="text-left mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Answer Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockQuestions.map((q, i) => (
                  <div key={q.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    {answers[i] === q.correct ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> : <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{q.question}</p>
                      <p className="text-xs text-muted-foreground">Your answer: {q.options[answers[i] ?? 0]} {answers[i] !== q.correct && `· Correct: ${q.options[q.correct]}`}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="gap-2" onClick={resetQuiz}><RotateCcw className="h-4 w-4" /> Retry Quiz</Button>
              <Link href={`/notes/${params.id}`}><Button variant="gradient" className="gap-2">Back to Note</Button></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
