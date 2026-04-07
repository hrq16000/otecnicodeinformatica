import { memo } from "react";
import { Sun, Moon } from "lucide-react";

interface DarkModeToggleProps {
  isDark: boolean;
  toggle: () => void;
  className?: string;
}

const DarkModeToggleInner = ({ isDark, toggle, className = "" }: DarkModeToggleProps) => {
  return (
    <button
      onClick={toggle}
      className={`relative w-[52px] h-[28px] rounded-full transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
        isDark
          ? "bg-primary/80 border border-white/10"
          : "bg-secondary border border-border"
      } ${className}`}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
    >
      {/* Track background effects */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle at 70% 50%, hsl(215 65% 35% / 0.4), transparent 70%)",
        }}
      />

      {/* Sliding knob */}
      <span
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full shadow-md flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? "left-[26px] bg-primary-foreground/10 backdrop-blur-sm border border-white/20"
            : "left-[3px] bg-card border border-border shadow-sm"
        }`}
      >
        <Sun
          className={`absolute h-3.5 w-3.5 text-accent transition-all duration-400 ${
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-3.5 w-3.5 text-accent transition-all duration-400 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </span>

      {/* Decorative stars for dark mode */}
      <span
        className={`absolute top-[5px] left-[8px] w-1 h-1 rounded-full bg-white/60 transition-all duration-500 ${
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      />
      <span
        className={`absolute top-[14px] left-[14px] w-0.5 h-0.5 rounded-full bg-white/40 transition-all duration-700 ${
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      />
    </button>
  );
};

export const DarkModeToggle = memo(DarkModeToggleInner);
