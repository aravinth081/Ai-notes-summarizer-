"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockDecks = [
  { id: "1", title: "Data Structures - Trees & Graphs", cards: 12, mastered: 8, lastStudied: "2 hours ago", color: "from-violet-500 to-purple-600" },
  { id: "2", title: "Operating Systems - Processes", cards: 18, mastered: 12, lastStudied: "1 day ago", color: "from-blue-500 to-cyan-600" },
  { id: "3", title: "DBMS - Normalization", cards: 10, mastered: 3, lastStudied: "3 days ago", color: "from-emerald-500 to-teal-600" },
  { id: "4", title: "Computer Networks - OSI Model", cards: 15, mastered: 15, lastStudied: "5 hours ago", color: "from-orange-500 to-amber-600" },
];

/**
 * Flashcards listing page — shows all decks
 */
export default function FlashcardsListPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-pink-400" /> Flashcard Decks
          </h1>
          <p className="text-muted-foreground mt-1">{mockDecks.length} decks · {mockDecks.reduce((a, b) => a + b.cards, 0)} total cards</p>
        </div>
        <Link href="/notes">
          <Button variant="gradient" className="gap-2"><Plus className="h-4 w-4" /> Create Deck</Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockDecks.map((deck, i) => {
          const progress = (deck.mastered / deck.cards) * 100;
          return (
            <motion.div key={deck.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/flashcards/${deck.id}`}>
                <Card className="group hover:shadow-lg hover:border-border cursor-pointer transition-all duration-300">
                  <div className={`h-1.5 bg-gradient-to-r ${deck.color} rounded-t-xl`} />
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{deck.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span>{deck.cards} cards</span> · <span>{deck.mastered} mastered</span> ·
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {deck.lastStudied}</span>
                    </div>
                    <Progress value={progress} className="h-1.5 mb-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{Math.round(progress)}% mastered</span>
                      {progress === 100 && <Badge variant="secondary" className="text-xs gap-1"><CheckCircle2 className="h-3 w-3" /> Complete</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
