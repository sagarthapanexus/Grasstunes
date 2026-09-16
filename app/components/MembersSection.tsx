"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Member } from "../data/content";

export default function MembersSection({ members }: { members: Member[] }) {
  const [active, setActive] = useState<Member | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="member-rows">
        {members.map((member) => (
          <button
            key={member.slug}
            type="button"
            className="member-row"
            onClick={() => setActive(member)}
          >
            <Image
              src={member.photo}
              alt={member.name}
              width={56}
              height={56}
              className="member-row-avatar"
            />
            <div>
              <p className="member-row-name">{member.name}</p>
              <p className="member-row-role">{member.role}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={active.photo}
              alt={active.name}
              width={440}
              height={280}
              className="modal-photo"
            />
            <h3 className="modal-name">{active.name}</h3>
            <p className="modal-role">
              {active.role} · {active.years}
            </p>
            <p className="modal-bio">{active.bio}</p>
          </div>
        </div>
      )}
    </>
  );
}
