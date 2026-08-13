import { useEffect, useState } from "react";

export const STORY_SCROLL_END = 0.38;

const getProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  return distance > 0 ? Math.min(window.scrollY / distance, 1) : 0;
};

export function normalizeStoryProgress(progress: number): number {
  return Math.min(Math.max(progress / STORY_SCROLL_END, 0), 1);
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(getProgress);
  useEffect(() => {
    const update = () => setProgress(getProgress());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return progress;
}
