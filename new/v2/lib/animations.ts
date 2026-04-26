export const supportsReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const fadeUpConfig = {
  y: 24,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out"
};
