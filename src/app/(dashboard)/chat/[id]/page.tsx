"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Send, Sparkles, User, Copy, ThumbsUp, ThumbsDown,
  RotateCcw, FileText, BookOpen, HelpCircle, ListChecks, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  timestamp: Date;
}

const suggestedQuestions = [
  { text: "Explain Binary Search Trees", icon: BookOpen },
  { text: "Give important questions for Unit 3", icon: ListChecks },
  { text: "Simplify graph traversal algorithms", icon: Brain },
  { text: "Generate viva questions from this topic", icon: HelpCircle },
];

const mockResponses: Record<string, string> = {
  default: `Based on your notes, here's what I found:

## Key Concepts

**Binary Search Trees (BST)** are a fundamental data structure where:
- The left subtree contains nodes with keys **less than** the parent
- The right subtree contains nodes with keys **greater than** the parent
- Both subtrees are also BSTs

### Time Complexities:
| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

### Important Points for Exams:
1. **AVL Trees** are self-balancing BSTs with height difference ≤ 1
2. **Rotations** (LL, RR, LR, RL) maintain balance after modifications
3. **BFS** uses a queue; **DFS** uses a stack/recursion

> 📖 *Source: Unit 3 - Section 3.2, Page 15-22*

Would you like me to generate practice questions on this topic?`,
};

/**
 * Chat with Notes page — ChatGPT-like interface with RAG-powered responses
 * Features: streaming-like animation, citations, suggested questions, markdown rendering
 */
export default function ChatPage() {
  const params = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateStreaming = async (response: string, messageId: string) => {
    setIsTyping(true);
    let currentText = "";
    const words = response.split(" ");

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, content: currentText } : m
        )
      );
      await new Promise((r) => setTimeout(r, 15 + Math.random() * 25));
    }
    setIsTyping(false);
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      sources: ["Unit 3 - Section 3.2, Page 15-22", "Unit 3 - Section 3.4, Page 28-35"],
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await simulateStreaming(mockResponses.default, assistantMessage.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMarkdown = (text: string) => {
    // Basic markdown rendering
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold mt-4 mb-2">{line.replace("## ", "")}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-base font-medium mt-3 mb-1.5">{line.replace("### ", "")}</h3>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold my-1">{line.replace(/\*\*/g, "")}</p>;
      if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc text-sm">{renderInlineMarkdown(line.replace("- ", ""))}</li>;
      if (line.startsWith("> ")) return <blockquote key={i} className="border-l-2 border-violet-500 pl-3 my-2 text-sm text-muted-foreground italic">{line.replace("> ", "")}</blockquote>;
      if (line.match(/^\d+\./)) return <li key={i} className="ml-4 list-decimal text-sm">{renderInlineMarkdown(line.replace(/^\d+\.\s*/, ""))}</li>;
      if (line.startsWith("|")) return <p key={i} className="text-sm font-mono">{line}</p>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-sm leading-relaxed">{renderInlineMarkdown(line)}</p>;
    });
  };

  const renderInlineMarkdown = (text: string) => {
    // Handle **bold** and `code`
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={i} className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">{part.slice(1, -1)}</code>;
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="shrink-0 border-b border-border/50 p-4 flex items-center gap-3 bg-background/80 backdrop-blur-sm">
        <Link href={`/notes/${params.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Chat with Notes</h1>
            <p className="text-xs text-muted-foreground">Data Structures - Unit 3</p>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto text-xs">
          <FileText className="h-3 w-3 mr-1" />
          RAG Enabled
        </Badge>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 mb-6 shadow-xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Chat with your Notes</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Ask me anything about your uploaded notes. I&apos;ll find the relevant sections and explain them clearly.
              </p>

              {/* Suggested Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q.text}
                    onClick={() => handleSend(q.text)}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-accent/50 transition-all text-left text-sm cursor-pointer group"
                  >
                    <q.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {q.text}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Messages */}
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 shrink-0 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-xs">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[85%] ${message.role === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-md"
                        : "bg-muted/50 border border-border/30 rounded-tl-md"
                    }`}
                  >
                    {message.role === "user" ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      <div className="space-y-1">
                        {message.content ? (
                          renderMarkdown(message.content)
                        ) : (
                          <div className="flex items-center gap-2 py-1">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                            <span className="text-xs text-muted-foreground">Thinking...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Citations & Actions for assistant messages */}
                  {message.role === "assistant" && message.content && !isTyping && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {message.sources?.map((source, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          📄 {source}
                        </Badge>
                      ))}
                      <div className="flex gap-1 ml-auto">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            navigator.clipboard.writeText(message.content);
                            toast.success("Copied to clipboard");
                          }}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <Avatar className="h-8 w-8 shrink-0 mt-1">
                    <AvatarFallback className="bg-muted text-xs font-bold">
                      AS
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="shrink-0 border-t border-border/50 p-4 bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 p-2 rounded-xl border border-border/50 bg-muted/30 focus-within:border-primary/50 transition-colors">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your notes..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              variant="gradient"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            AI responses are generated from your uploaded notes using RAG
          </p>
        </div>
      </div>
    </div>
  );
}
