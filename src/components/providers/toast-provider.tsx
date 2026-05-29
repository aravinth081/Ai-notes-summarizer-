"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

/**
 * Toast notification provider using sonner
 * Automatically adapts to current theme
 */
export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme as "light" | "dark" | "system"}
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--foreground))",
        },
      }}
    />
  );
}
