"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
export function ThemeToggle() {
  const {theme, toggle} = useTheme();
  return <button aria-label="Toggle theme" onClick={toggle} className="icon-link">{theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button>;
}