import Lenis from "lenis";

export function createLenis() {
  return new Lenis({
    duration: 1.1,
    smoothWheel: true
  });
}
