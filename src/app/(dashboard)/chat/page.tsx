"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Plus, Clock, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockChats = [
  { id: "1", title: "Data Structures - Unit 3", messages: 12, lastMessage: "Explain AVL tree rotations", time: "2 hours ago" },
  { id: "2", title: "Operating Systems Notes", messages: 8, lastMessage: "What are semaphores?", time: "1 day ago" },
  { id: "3", title: "Computer Networks", messages: 23, lastMessage: "Explain TCP vs UDP", time: "3 days ago" },
];

/**
 * Chat listing page — shows all chat sessions
 */
export default function ChatListPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-7 w-7 text-fuchsia-400" /> AI Chat
          </h1>
          <p className="text-muted-foreground mt-1">Chat with your notes using AI</p>
        </div>
        <Link href="/notes">
          <Button variant="gradient" className="gap-2"><Plus className="h-4 w-4" /> New Chat</Button>
        </Link>
      </motion.div>

      {mockChats.length > 0 ? (
        <div className="space-y-3">
          {mockChats.map((chat, i) => (
            <motion.div key={chat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/chat/${chat.id}`}>
                <Card className="group hover:shadow-lg hover:border-border cursor-pointer transition-all duration-300">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 shrink-0 shadow-lg">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{chat.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{chat.lastMessage}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {chat.time}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{chat.messages} messages</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No chats yet</h3>
          <p className="text-muted-foreground mb-6">Upload notes and start chatting with AI</p>
          <Link href="/upload"><Button variant="gradient">Upload Notes</Button></Link>
        </div>
      )}
    </div>
  );
}
