"use client";

import { useEffect } from "react";

export default function DisableRightClick() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();
    const blockDragStart = (e: DragEvent) => e.preventDefault();

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDragStart);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDragStart);
    };
  }, []);

  return null;
}
