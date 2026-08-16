import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label={`${site.name} — inicio`}>
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 shrink-0 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105"
        role="img"
        aria-label="Logotipo de Lumen: una cruz dorada dentro de un círculo azul marino"
      >
        <circle cx="24" cy="24" r="24" fill="#001c3c" />
        <circle cx="24" cy="24" r="20.5" fill="none" stroke="#fed65b" strokeOpacity="0.55" strokeWidth="1.5" />
        <path
          d="M24 15.5v17M15.5 24h17"
          stroke="#fed65b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="9.5" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
        <path
          d="M24 31v4.5"
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M19.5 35.5h9"
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {!compact && (
        <span className="font-display text-xl font-bold tracking-tight text-primary dark:text-on-surface">
          {site.name}
        </span>
      )}
    </Link>
  );
}
