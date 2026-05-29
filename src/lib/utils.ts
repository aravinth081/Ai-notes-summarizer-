import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format file size from bytes to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Generate a random gradient for cards
 */
export function getRandomGradient(seed: string): string {
  const gradients = [
    "from-violet-500/10 to-purple-500/10",
    "from-blue-500/10 to-cyan-500/10",
    "from-emerald-500/10 to-teal-500/10",
    "from-orange-500/10 to-amber-500/10",
    "from-pink-500/10 to-rose-500/10",
    "from-indigo-500/10 to-blue-500/10",
  ];
  const index = seed.split("").reduce((a, b) => a + b.charCodeAt(0), 0) % gradients.length;
  return gradients[index];
}

/**
 * Delay helper for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get file type icon name based on extension
 */
export function getFileTypeFromExtension(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const mapping: Record<string, string> = {
    pdf: "PDF",
    docx: "DOCX",
    doc: "DOCX",
    pptx: "PPT",
    ppt: "PPT",
    txt: "TXT",
    png: "IMAGE",
    jpg: "IMAGE",
    jpeg: "IMAGE",
    zip: "ZIP",
  };
  return mapping[ext] || "FILE";
}
