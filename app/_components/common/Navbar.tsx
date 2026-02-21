// // //
"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-slate-100 backdrop-blur-xl dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 xl:px-0 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-xs border border-primary/10">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Shabuj Global <span className="text-primary">Education</span>
          </span>
        </Link>

        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer bg-primary/20 text-primary/80 shadow-xs border border-primary/10 hover:bg-primary/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
