"use client";

import { useEffect } from "react";

export function MaraudersConsumeUnlock() {
  useEffect(() => {
    void fetch("/api/marauders-lock", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true
    });
  }, []);

  return null;
}
