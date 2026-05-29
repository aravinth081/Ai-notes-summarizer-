"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Grid3X3,
  List,
  Filter,
  Sparkles,
  MoreHorizontal,
  Trash2,
  Download,
  MessageSquare,
  Layers,
  CircleDot,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { formatRelativeTime, getRandomGradient } from "@/lib/utils";

const mockNotes = [
  { id: "1", name: "Data Structures - Unit 3", type: "PDF", size: "2.4 MB", pages: 42, date: new Date(Date.now() - 3600000), aiGenerations: 5, category: "Computer Science" },
  { id: "2", name: "Operating Systems Notes", type: "DOCX", size: "1.8 MB", pages: 28, date: new Date(Date.now() - 7200000), aiGenerations: 3, category: "Computer Science" },
  { id: "3", name: "Computer Networks - Full", type: "PDF", size: "5.1 MB", pages: 86, date: new Date(Date.now() - 86400000), aiGenerations: 8, category: "Computer Science" },
  { id: "4", name: "DBMS Handwritten Notes", type: "IMAGE", size: "3.2 MB", pages: 15, date: new Date(Date.now() - 172800000), aiGenerations: 2, category: "Database" },
  { id: "5", name: "Software Engineering", type: "PDF", size: "4.5 MB", pages: 64, date: new Date(Date.now() - 259200000), aiGenerations: 6, category: "Engineering" },
  { id: "6", name: "Discrete Mathematics", type: "PDF", size: "3.8 MB", pages: 52, date: new Date(Date.now() - 345600000), aiGenerations: 4, category: "Mathematics" },
];

/**
 * Notes listing page with search, filter, and grid/list view toggle
 */
export default function NotesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filteredNotes = mockNotes.filter((note) =>
    note.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Notes</h1>
          <p className="text-muted-foreground mt-1">
            {mockNotes.length} documents uploaded
          </p>
        </div>
        <Link href="/upload">
          <Button variant="gradient" className="gap-2">
            <FileText className="h-4 w-4" />
            Upload New
          </Button>
        </Link>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Notes Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/notes/${note.id}`}>
                <Card className="group hover:shadow-lg hover:border-border cursor-pointer transition-all duration-300 h-full">
                  {/* Gradient top accent */}
                  <div className={`h-1.5 bg-gradient-to-r ${getRandomGradient(note.id)} rounded-t-xl`} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Sparkles className="h-4 w-4 mr-2" /> Generate Summary</DropdownMenuItem>
                          <DropdownMenuItem><MessageSquare className="h-4 w-4 mr-2" /> Chat with Notes</DropdownMenuItem>
                          <DropdownMenuItem><CircleDot className="h-4 w-4 mr-2" /> Generate MCQs</DropdownMenuItem>
                          <DropdownMenuItem><Layers className="h-4 w-4 mr-2" /> Create Flashcards</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Download className="h-4 w-4 mr-2" /> Download</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors truncate">
                      {note.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {note.type} · {note.size} · {note.pages} pages
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {note.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatRelativeTime(note.date)}
                      </span>
                    </div>

                    {note.aiGenerations > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-violet-400" />
                          {note.aiGenerations} AI generations
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link href={`/notes/${note.id}`}>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border/40 hover:border-border hover:bg-accent/30 transition-all cursor-pointer group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {note.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {note.type} · {note.size} · {note.pages} pages · {formatRelativeTime(note.date)}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0 hidden sm:flex">
                    {note.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-violet-400" />
                    {note.aiGenerations}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
