"use client";

import { useState } from "react";

export default function BioText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bio-block">
      <p className={`bio-text${expanded ? " expanded" : ""}`}>{text}</p>
      {!expanded && (
        <button className="see-more-btn" onClick={() => setExpanded(true)}>
          See more
        </button>
      )}
    </div>
  );
}
