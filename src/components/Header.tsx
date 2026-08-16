"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks } from "@/lib/site";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-transparent bg-surface/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <div className="group">
          <Logo />
        </div>
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-label-md cursor-pointer text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary active:scale-95 dark:text-outline-variant dark:hover:text-secondary-fixed"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          {busquedaAbierta ? (
            <form
              action="/busqueda"
              method="get"
              className="hidden items-center md:flex"
              role="search"
            >
              <input
                name="q"
                autoFocus
                type="search"
                placeholder="Buscar pasajes, temas, libros…"
                className="w-64 rounded-xl border border-outline-variant bg-surface-container-lowest py-2 pl-4 pr-4 font-label-md text-label-md text-on-surface placeholder:text-outline focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container focus:outline-none transition-all"
              />
            </form>
          ) : (
            <button
              type="button"
              aria-label="Abrir búsqueda"
              onClick={() => setBusquedaAbierta(true)}
              className="hidden cursor-pointer rounded-full p-2 text-primary transition-all duration-200 hover:bg-surface-container-low active:scale-95 dark:text-primary-fixed md:block"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <ThemeToggle />
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setAbierto(!abierto)}
            className="cursor-pointer rounded-full p-2 text-primary transition-all duration-200 hover:bg-surface-container-low active:scale-95 dark:text-primary-fixed md:hidden"
          >
            {abierto ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {abierto && (
        <div className="border-t border-outline-variant/30 bg-surface/95 px-margin-mobile pb-6 pt-4 backdrop-blur-md md:hidden">
          <form action="/busqueda" method="get" className="mb-4" role="search">
            <input
              name="q"
              type="search"
              placeholder="Buscar pasajes, temas, libros…"
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-2.5 pl-4 pr-4 font-label-md text-label-md text-on-surface placeholder:text-outline focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container focus:outline-none"
            />
          </form>
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setAbierto(false)}
                  className="block rounded-lg px-3 py-2.5 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
