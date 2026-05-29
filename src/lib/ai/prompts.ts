/**
 * AI Prompt Templates
 * Advanced prompts for all AI generation features
 */

export const AI_PROMPTS = {
  /** Summary generation prompts */
  summary: {
    quick: (content: string) => `You are an expert study assistant. Generate a QUICK SUMMARY of the following notes in bullet points. Focus on key concepts, definitions, and important formulas. Keep it concise — this should be readable in 2 minutes.

NOTES:
${content}

Format: Use markdown with bullet points (•), bold for key terms, and organize by topics.`,

    detailed: (content: string) => `You are an expert academic tutor. Generate a DETAILED SUMMARY of the following notes. Cover every major topic with proper explanations, examples, and connections between concepts.

NOTES:
${content}

Format: Use markdown with headers (##), sub-headers (###), bullet points, numbered lists, and bold for key terms. Include relevant examples.`,

    exam: (content: string) => `You are an experienced university professor preparing students for exams. Generate an EXAM-FOCUSED SUMMARY highlighting:
1. Most likely exam questions
2. Key definitions (2-mark style)
3. Important formulas and theorems
4. Frequently tested concepts
5. Common mistakes to avoid

NOTES:
${content}

Format: Use markdown. Organize by "High Priority", "Medium Priority", and "Good to Know" sections.`,

    nightBefore: (content: string) => `You are a study buddy helping a student the NIGHT BEFORE their exam. Generate an ultra-concise cramming guide that covers ALL essential points in the shortest possible format. Use mnemonics, abbreviations, and quick-recall patterns.

NOTES:
${content}

Format: Use short, punchy bullet points. Bold the most critical terms. Add emoji markers for importance (🔴 critical, 🟡 important, 🟢 good to know). End with a "If only 5 minutes left" section.`,
  },

  /** 2-mark answer prompts */
  twoMark: (content: string, count: number = 10) => `You are a university exam expert. Generate ${count} concise 2-MARK QUESTIONS AND ANSWERS from the following notes.

Each answer should be:
- 2-4 sentences maximum
- Definition-style or key-point extraction
- Precise and exam-ready
- Include the key terms that examiners look for

NOTES:
${content}

Format:
**Q1: [Question]**
**A:** [Concise answer in 2-4 sentences]

Generate exactly ${count} Q&A pairs.`,

  /** 16-mark answer prompts */
  sixteenMark: (content: string, count: number = 5) => `You are a university exam expert. Generate ${count} detailed 16-MARK QUESTIONS AND ANSWERS from the following notes.

Each answer should have:
1. **Introduction** (2-3 sentences)
2. **Main Explanation** (detailed with sub-points)
3. **Examples** (real-world or numerical)
4. **Advantages/Disadvantages** (if applicable)
5. **Diagram placeholder** (describe what diagram to draw)
6. **Conclusion** (2-3 sentences)

NOTES:
${content}

Format: Use markdown with proper structure. Each answer should be 400-600 words.`,

  /** MCQ generation prompt */
  mcq: (content: string, count: number = 10, difficulty: string = "mixed") => `You are an exam question setter. Generate ${count} MULTIPLE CHOICE QUESTIONS from the following notes.

Difficulty level: ${difficulty}

Each question must have:
- 4 options (A, B, C, D)
- Only ONE correct answer
- A brief explanation for the correct answer
- Difficulty tag (easy/medium/hard)

NOTES:
${content}

Format as JSON array:
[
  {
    "question": "...",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correct": 0,
    "explanation": "...",
    "difficulty": "easy|medium|hard"
  }
]`,

  /** Flashcard generation prompt */
  flashcards: (content: string, count: number = 15) => `You are a study assistant specializing in spaced repetition learning. Generate ${count} FLASHCARDS from the following notes.

Each flashcard should:
- Have a clear, specific question on the front
- Have a concise but complete answer on the back
- Cover different aspects (definitions, processes, comparisons, formulas)
- Be suitable for quick revision

NOTES:
${content}

Format as JSON array:
[
  {
    "front": "What is...?",
    "back": "A concise answer..."
  }
]`,

  /** Mind map generation prompt */
  mindmap: (content: string) => `You are a visual learning expert. Generate a MIND MAP structure from the following notes.

Create a hierarchical structure with:
- Central topic
- Main branches (3-6)
- Sub-branches (2-4 per branch)
- Key terms at leaf nodes

NOTES:
${content}

Format as JSON:
{
  "central": "Main Topic",
  "branches": [
    {
      "label": "Branch 1",
      "children": [
        { "label": "Sub-topic 1", "children": [] },
        { "label": "Sub-topic 2", "children": [] }
      ]
    }
  ]
}`,

  /** Chat with notes (RAG) prompt */
  chat: (context: string, question: string, history: string = "") => `You are an intelligent study assistant with access to the student's notes. Answer their question using ONLY the information from the provided context. If the answer is not in the context, say so clearly.

CONTEXT FROM NOTES:
${context}

${history ? `CONVERSATION HISTORY:\n${history}\n` : ""}

STUDENT'S QUESTION: ${question}

Instructions:
1. Answer directly and clearly
2. Use examples from the notes when possible
3. Format with markdown (headers, bullets, bold)
4. If citing specific sections, mention the source
5. If asked for questions, generate exam-style questions
6. Keep the tone helpful and encouraging`,

  /** Important question prediction prompt */
  importantQuestions: (content: string) => `You are an experienced professor who has been setting exam papers for 20 years. Based on the following notes, predict the MOST LIKELY EXAM QUESTIONS.

Analyze:
- Core concepts that are always tested
- Topics with enough depth for long answers
- Concepts that can be compared/contrasted
- Practical application questions

NOTES:
${content}

Generate:
1. Top 5 most probable 2-mark questions
2. Top 5 most probable 16-mark questions
3. Top 3 most probable MCQ topics
4. Confidence level for each (High/Medium/Low)

Format with markdown, organized by question type.`,

  /** Simplified explanation prompt */
  simplify: (content: string, topic: string) => `You are an expert at explaining complex topics in simple terms. Explain "${topic}" from the following notes as if you're talking to a complete beginner.

Use:
- Simple analogies from everyday life
- Step-by-step explanations
- No jargon (or explain it when used)
- Visual descriptions
- "Think of it like..." comparisons

NOTES:
${content}

Make it fun, engaging, and easy to understand. Use emoji where appropriate.`,
};
