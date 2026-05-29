/**
 * Application-wide constants
 */

export const APP_NAME = "AI Notes Summarizer";
export const APP_DESCRIPTION = "Transform your notes into exam-ready study materials with AI. Generate summaries, flashcards, MCQs, mind maps, and more.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/** Navigation items for the landing page */
export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Dashboard sidebar navigation */
export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Upload Notes", href: "/upload", icon: "Upload" },
  { label: "My Notes", href: "/notes", icon: "FileText" },
  { label: "AI Chat", href: "/chat", icon: "MessageSquare" },
  { label: "Flashcards", href: "/flashcards", icon: "Layers" },
  { label: "Study Planner", href: "/study-planner", icon: "CalendarDays" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

/** AI feature cards displayed on note detail pages */
export const AI_FEATURES = [
  {
    id: "summary",
    title: "AI Summary",
    description: "Generate concise summaries with adjustable length and style",
    icon: "Sparkles",
    gradient: "from-violet-500 to-purple-600",
    href: "/summarize",
  },
  {
    id: "2mark",
    title: "2-Mark Answers",
    description: "University-style concise answers for quick revision",
    icon: "FileEdit",
    gradient: "from-blue-500 to-cyan-600",
    href: "/answers",
  },
  {
    id: "16mark",
    title: "16-Mark Answers",
    description: "Structured long answers with introductions and conclusions",
    icon: "BookOpen",
    gradient: "from-emerald-500 to-teal-600",
    href: "/answers",
  },
  {
    id: "mcq",
    title: "MCQ Generator",
    description: "Auto-generate MCQs with difficulty levels and explanations",
    icon: "CircleDot",
    gradient: "from-orange-500 to-amber-600",
    href: "/mcq",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    description: "Smart flashcards with spaced repetition for effective learning",
    icon: "Layers",
    gradient: "from-pink-500 to-rose-600",
    href: "/flashcards",
  },
  {
    id: "mindmap",
    title: "Mind Maps",
    description: "Interactive visual mind maps of your study material",
    icon: "Network",
    gradient: "from-indigo-500 to-blue-600",
    href: "/mindmap",
  },
  {
    id: "chat",
    title: "Chat with Notes",
    description: "Ask questions about your notes with AI-powered answers",
    icon: "MessageSquare",
    gradient: "from-fuchsia-500 to-pink-600",
    href: "/chat",
  },
  {
    id: "voice",
    title: "Voice Tutor",
    description: "Listen to AI explanations with text-to-speech",
    icon: "Volume2",
    gradient: "from-teal-500 to-emerald-600",
    href: "/voice",
  },
] as const;

/** Pricing plans */
export const PRICING_PLANS = [
  {
    name: "Free",
    price: 0,
    priceInr: 0,
    description: "Perfect for trying out AI Notes Summarizer",
    features: [
      "5 file uploads per month",
      "10 AI generations per day",
      "Basic summaries",
      "MCQ generation (5 per set)",
      "Community support",
    ],
    limitations: [
      "No AI chat",
      "No flashcards export",
      "No mind maps",
      "No voice tutor",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: 9.99,
    priceInr: 499,
    description: "For serious students who want the best results",
    features: [
      "Unlimited file uploads",
      "Unlimited AI generations",
      "All summary modes",
      "AI Chat with Notes",
      "Smart Flashcards",
      "Mind Map Generator",
      "Voice Tutor",
      "PDF & DOCX export",
      "Study Planner",
      "Priority support",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    price: 24.99,
    priceInr: 1499,
    description: "For study groups and institutions",
    features: [
      "Everything in Pro",
      "5 team members",
      "Shared notes & flashcards",
      "Admin dashboard",
      "Analytics & insights",
      "API access",
      "Custom AI prompts",
      "Dedicated support",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
] as const;

/** Supported file types */
export const SUPPORTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "text/plain": [".txt"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
} as const;

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

/** Testimonials data */
export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "3rd Year Engineering Student",
    avatar: "PS",
    content: "This tool saved my entire semester! I uploaded my 200-page notes and got perfect 16-mark answers in minutes. The AI chat feature is like having a personal tutor.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Medical Student, AIIMS",
    avatar: "AM",
    content: "The flashcard generator with spaced repetition is incredible. I went from struggling with anatomy to scoring in the top 10% of my batch.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "MBA Student, IIM-B",
    avatar: "SJ",
    content: "The mind map feature helps me visualize complex case studies. The MCQ generator is perfect for mock test preparation. Absolute game changer!",
    rating: 5,
  },
  {
    name: "Karthik R",
    role: "CS Student, VIT",
    avatar: "KR",
    content: "I love the 'one-night-before-exam' mode. It creates the perfect concise summary that covers everything. The AI chat actually understands my notes!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Law Student, NLU",
    avatar: "AP",
    content: "Uploading case PDFs and getting structured answers with proper legal arguments is amazing. The important question predictor is scarily accurate.",
    rating: 5,
  },
  {
    name: "Rahul Dev",
    role: "PhD Scholar, IISc",
    avatar: "RD",
    content: "The RAG-powered chat feature is research-grade. It cites exact sections from my papers. This is not just for undergrads — it's a serious research tool.",
    rating: 5,
  },
] as const;

/** FAQ data */
export const FAQ_ITEMS = [
  {
    question: "What types of files can I upload?",
    answer: "You can upload PDFs, DOCX files, PowerPoint presentations (PPTX), plain text files, and images. We support handwritten notes through OCR (Optical Character Recognition) as well.",
  },
  {
    question: "How accurate are the AI-generated answers?",
    answer: "Our AI uses advanced models (GPT-4, Claude, Gemini) combined with RAG (Retrieval Augmented Generation) to generate answers directly from your notes. The accuracy depends on the quality of your source material, but we consistently achieve 90%+ relevance scores.",
  },
  {
    question: "Can I use this for competitive exam preparation?",
    answer: "Absolutely! The MCQ generator, important question predictor, and flashcard system are specifically designed for exam preparation. Many students use it for GATE, UPSC, NEET, and university exams.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All files are encrypted at rest and in transit. We never share your data with third parties. You can delete your files at any time, and they'll be permanently removed from our servers.",
  },
  {
    question: "Do I need to be online to use the generated content?",
    answer: "Generated summaries, flashcards, and answers can be exported as PDF or DOCX for offline use. The AI Chat and generation features require an internet connection.",
  },
  {
    question: "What's the difference between Free and Pro plans?",
    answer: "The Free plan gives you 5 uploads and 10 AI generations per day — great for trying out the platform. The Pro plan unlocks unlimited everything, including AI Chat, Voice Tutor, Mind Maps, and export features.",
  },
] as const;
