"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [tema, setTema] = useState<"light" | "dark">("light");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTema(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  function alternar() {
    const nuevo = tema === "dark" ? "light" : "dark";
    setTema(nuevo);
    document.documentElement.classList.toggle("dark", nuevo === "dark");
    try {
      localStorage.setItem("lumen-theme", nuevo);
    } catch {
      /* sin almacenamiento disponible */
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={tema === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
      className="cursor-pointer rounded-full p-2 text-primary transition-all duration-200 hover:bg-surface-container-low active:scale-95 dark:text-primary-fixed"
    >
      {tema === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4 11a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2h1Zm17 0a1 1 0 0 1 0 2h-1a1 1 0 1 1 0-2h1ZM5.64 6.05a1 1 0 0 1 1.41 0l.71.7a1 1 0 0 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41Zm10.6 10.6a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42Zm.71-10.6a1 1 0 0 1 0 1.41l-.7.71a1 1 0 1 1-1.42-1.41l.71-.71a1 1 0 0 1 1.41 0ZM6.35 17.35a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M12.3 2a9.9 9.9 0 0 0 8.3 16.6A9.9 9.9 0 1 1 12.3 2Zm.2 2.1a7.8 7.8 0 1 0 6.9 11.6 7.9 7.9 0 0 1-6.9-11.6Z" />
        </svg>
      )}
    </button>
  );
}
