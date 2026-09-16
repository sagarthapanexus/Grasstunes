"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../data/content";

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <nav className="profile-tabs" aria-label="Primary navigation">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`profile-tab${pathname === link.href ? " active" : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
