"use client";

import { useEffect } from "react";

import {
  analyticsEvents,
  type AnalyticsEventName,
  type AnalyticsPayload,
  trackPortfolioEvent
} from "@/lib/analytics";

function isAnalyticsEvent(value: string): value is AnalyticsEventName {
  return analyticsEvents.includes(value as AnalyticsEventName);
}

function readPayload(element: HTMLElement): AnalyticsPayload {
  const rawPayload = element.dataset.analyticsPayload;

  if (!rawPayload) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawPayload);

    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as AnalyticsPayload;
    }
  } catch {
    return {};
  }

  return {};
}

export function AnalyticsEventBridge() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const element = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent;

      if (!element || !eventName || !isAnalyticsEvent(eventName)) {
        return;
      }

      trackPortfolioEvent(eventName, readPayload(element));
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
