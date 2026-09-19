"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "../data/content";

const ICONS: Record<string, React.ReactNode> = {
  "/": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
    </svg>
  ),
  "/music": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  ),
  "/videos": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6" width="14" height="12" rx="2" />
      <path d="M16.5 10.5 21.5 7v10l-5-3.5z" />
    </svg>
  ),
  "/media-coverage": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M2.5 9h19M8 9v10.5M12.5 13h6M12.5 16h6" />
    </svg>
  ),
  "/gallery": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <circle cx="8.5" cy="10" r="1.75" />
      <path d="m3 17 5.5-5.5L13 16l3-3 5 5" />
    </svg>
  ),
  "/grassnews": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11v3a2 2 0 0 0 2 2h1l3.5 4v-4H15a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
      <path d="M17 8.5c1.8 1 1.8 6 0 7M20 6c3 2 3 10 0 12" />
    </svg>
  ),
  "/contact": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </svg>
  ),
};

export default function WaffleMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="waffle-menu" ref={ref}>
      {open && (
        <div className="waffle-panel" role="menu" aria-label="Site navigation">
          <div className="waffle-grid">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="waffle-tile"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="waffle-tile-icon">{ICONS[link.href]}</span>
                <span className="waffle-tile-label">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className={`waffle-button${open ? " active" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open site menu"
      >
        <span className="waffle-dots" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="waffle-dot" />
          ))}
        </span>
      </button>
    </div>
  );
}
