export const analyticsEvents = [
  "resume_download",
  "linkedin_click",
  "email_click",
  "recruiter_mode_open",
  "project_open",
  "case_study_depth",
  "github_click",
  "demo_click"
] as const;

export type AnalyticsEventName = (typeof analyticsEvents)[number];

export type AnalyticsPayload = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: AnalyticsPayload }) => void;
    gtag?: (
      command: "event",
      eventName: string,
      options?: AnalyticsPayload
    ) => void;
  }
}

export function trackPortfolioEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsPayload = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("portfolio:event", {
      detail: {
        eventName,
        payload
      }
    })
  );

  window.plausible?.(eventName, { props: payload });
  window.gtag?.("event", eventName, payload);
}
