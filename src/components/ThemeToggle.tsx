"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);
    document.documentElement.dataset.theme = nextIsLight ? "light" : "dark";
  };

  const label = isLight ? "切换至深色模式" : "切换至浅色模式";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-emerald-300/35"
      aria-label={label}
      title={label}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:inline">{isLight ? "黑夜" : "白天"}</span>
    </button>
  );
}
