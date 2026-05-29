"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Volume2, Play, Pause, RotateCcw, RotateCw,
  Clock, ListMusic, Headset, Sparkles, ChevronRight, UserRound,
  Download, VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface Chapter {
  title: string;
  duration: string;
  timeSec: number;
}

interface TranscriptParagraph {
  timeSec: number;
  speaker: string;
  text: string;
}

const mockChapters: Chapter[] = [
  { title: "Introduction to Trees and Graphs", duration: "01:15", timeSec: 0 },
  { title: "Understanding Binary Search Tree Invariants", duration: "02:30", timeSec: 75 },
  { title: "AVL Trees and Self-Balancing Operations", duration: "03:45", timeSec: 225 },
  { title: "Introduction to Graph Traversals", duration: "01:50", timeSec: 450 },
];

const mockTranscript: TranscriptParagraph[] = [
  {
    timeSec: 0,
    speaker: "Tutor Emma",
    text: "Hello there! Welcome to your AI study session. Today we are breaking down Unit 3 of your Computer Science notes, which covers trees and graphs. Let's start with binary trees."
  },
  {
    timeSec: 35,
    speaker: "Tutor Emma",
    text: "Recall that a binary tree is simply a hierarchical structure where each node has at most two children, commonly referred to as the left child and the right child."
  },
  {
    timeSec: 75,
    speaker: "Tutor Emma",
    text: "Now, binary search trees, or BSTs, take this a step further. In a BST, for every single node, the left subtree contains keys smaller than the node, and the right subtree contains keys larger. This ordering is key because it allows us to perform searches in logarithmic time on average."
  },
  {
    timeSec: 150,
    speaker: "Tutor Emma",
    text: "But what happens if the tree gets skewed, like a single linked list? The search time degrades to linear time. To prevent this, we use AVL trees. AVL trees are self-balancing search trees."
  },
  {
    timeSec: 225,
    speaker: "Tutor Emma",
    text: "How do they maintain balance? By checking the balance factor, which is the height difference between the left and right subtrees. If this difference is greater than 1, we perform rotations like Left-Left, Right-Right, Left-Right, or Right-Left to rebalance the tree."
  },
  {
    timeSec: 350,
    speaker: "Tutor Emma",
    text: "Finally, let's look at graphs. A graph is just a collection of vertices and edges. We can traverse them using either Breadth-First Search, which goes level-by-level using a Queue, or Depth-First Search, which goes as deep as possible using a Stack."
  }
];

const tutorVoices = [
  { id: "emma", name: "Emma", description: "Friendly & Conversational" },
  { id: "james", name: "James", description: "Professional & Academic" },
  { id: "sophia", name: "Sophia", description: "Energetic & Exam Coach" },
];

export default function VoiceTutorPage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeVoice, setActiveVoice] = useState("emma");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalDuration = 480; // 8 minutes total

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(totalDuration, prev + seconds)));
  };

  const handleChapterClick = (timeSec: number) => {
    setCurrentTime(timeSec);
    setIsPlaying(true);
    toast.info(`Jumped to chapter at ${formatTime(timeSec)}`);
  };

  // Find the active transcript paragraph
  const activeParagraphIndex = mockTranscript.reduce((acc, curr, index) => {
    if (currentTime >= curr.timeSec) return index;
    return acc;
  }, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Back Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link href={`/notes/${params.id}`}>
            <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 hover:bg-accent/40">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="hidden sm:flex items-center gap-2 border-l border-border/40 pl-3">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-emerald-400" />
              AI Voice Tutor
            </h1>
            <Badge variant="outline" className="text-xs">Data Structures</Badge>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs"
          onClick={() => toast.success("Podcast explanation downloaded!")}
        >
          <Download className="h-3.5 w-3.5" /> Download Audio
        </Button>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Left Column: Player & Voice Settings */}
        <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
          {/* Main Waveform Audio Card */}
          <Card className="flex-1 flex flex-col justify-center items-center p-6 border-border/40 relative overflow-hidden bg-gradient-to-b from-card to-background">
            <div className="absolute top-4 left-4 flex items-center gap-1 text-xs text-muted-foreground bg-accent/30 px-2 py-1 rounded-md">
              <Headset className="h-3.5 w-3.5 text-emerald-400" />
              Audio Podcast Mode
            </div>

            <div className="text-center mb-8 mt-6">
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5 mb-2">
                Tutor Voice: {tutorVoices.find((v) => v.id === activeVoice)?.name}
              </Badge>
              <h2 className="text-xl font-bold">Unit 3 Exam Prep Lecture</h2>
              <p className="text-xs text-muted-foreground mt-1">Structured explanation of trees, BSTs, AVLs & graphs</p>
            </div>

            {/* Visual Waveform Representation */}
            <div className="w-full flex items-center justify-center gap-[3px] h-24 mb-8 px-8">
              {Array.from({ length: 48 }).map((_, idx) => {
                const height = Math.abs(Math.sin(idx * 0.3) * 60) + Math.cos(idx * 0.1) * 20 + 10;
                const isActive = idx / 48 <= currentTime / totalDuration;
                return (
                  <motion.div
                    key={idx}
                    className={`w-[4px] rounded-full transition-colors ${
                      isActive 
                        ? "bg-gradient-to-t from-emerald-500 to-teal-400" 
                        : "bg-muted-foreground/20"
                    }`}
                    style={{ height: `${height}%` }}
                    animate={isPlaying ? {
                      scaleY: [1, Math.random() * 0.4 + 0.8, 1],
                    } : { scaleY: 1 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (idx % 5) * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Timing Slider */}
            <div className="w-full px-6 mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                max={totalDuration}
                step={1}
                onValueChange={(val) => setCurrentTime(val[0])}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Control Panel */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setPlaybackSpeed((s) => s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 2 : 1)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground bg-accent px-3 py-1.5 rounded-lg border border-border/40 cursor-pointer"
                title="Playback Speed"
              >
                {playbackSpeed}x
              </button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSkip(-15)}
                className="rounded-full h-11 w-11 hover:scale-105"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>

              <Button
                variant="gradient"
                size="icon"
                className="rounded-full h-14 w-14 shadow-lg shadow-emerald-500/10 hover:scale-105"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white ml-0.5" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSkip(15)}
                className="rounded-full h-11 w-11 hover:scale-105"
              >
                <RotateCw className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={isMuted ? [0] : volume}
                  onValueChange={(val) => {
                    setVolume(val);
                    setIsMuted(val[0] === 0);
                  }}
                  max={100}
                  className="w-16"
                />
              </div>
            </div>
          </Card>

          {/* Voice Customization Settings */}
          <Card className="p-4 border-border/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <UserRound className="h-4 w-4 text-emerald-400" /> Choose Your AI Tutor Voice
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {tutorVoices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => {
                    setActiveVoice(voice.id);
                    toast.success(`Voice changed to ${voice.name}`);
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    activeVoice === voice.id
                      ? "border-emerald-500 bg-emerald-500/5 shadow-sm"
                      : "border-border/40 hover:border-border hover:bg-accent/40"
                  }`}
                >
                  <p className="text-xs font-bold">{voice.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{voice.description}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Audio Transcript & Chapter Selection */}
        <div className="lg:col-span-1 flex flex-col gap-6 min-h-0">
          {/* Lecture Chapters */}
          <Card className="border-border/40 shrink-0 max-h-48 flex flex-col overflow-hidden">
            <CardHeader className="py-3.5 border-b border-border/30">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ListMusic className="h-4 w-4 text-emerald-400" />
                Lecture Chapters
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto p-2 space-y-1">
              {mockChapters.map((chap, idx) => {
                // Find if this is the active chapter
                const nextChap = mockChapters[idx + 1];
                const isActive = currentTime >= chap.timeSec && (!nextChap || currentTime < nextChap.timeSec);

                return (
                  <button
                    key={idx}
                    onClick={() => handleChapterClick(chap.timeSec)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 font-semibold"
                        : "hover:bg-accent/50 text-muted-foreground"
                    }`}
                  >
                    <span className="truncate flex items-center gap-1">
                      <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-emerald-400" : "text-muted-foreground/40"}`} />
                      {chap.title}
                    </span>
                    <span className="font-mono text-[10px] bg-accent/40 px-1.5 py-0.5 rounded text-muted-foreground ml-2">
                      {chap.duration}
                    </span>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Interactive Transcript Follow-along */}
          <Card className="flex-1 border-border/40 flex flex-col min-h-0 overflow-hidden">
            <CardHeader className="py-3.5 border-b border-border/30 shrink-0">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Live Transcript Follow-along
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockTranscript.map((para, index) => {
                const isActive = activeParagraphIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setCurrentTime(para.timeSec)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                        : "border-transparent hover:bg-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold ${isActive ? "text-emerald-400" : "text-muted-foreground"}`}>
                        {para.speaker}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatTime(para.timeSec)}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isActive ? "text-foreground font-medium" : "text-muted-foreground/80"}`}>
                      {para.text}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
