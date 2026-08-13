import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import LoadingScreen from "./components/ui/LoadingScreen";
import Navigation from "./components/ui/Navigation";
import World from "./components/3d/World";
import { normalizeStoryProgress, useScrollProgress } from "./hooks/useScrollProgress";

interface ExperienceProps {
  storyProgress: number;
}

function Experience({ storyProgress }: ExperienceProps) {
  return (
    <>
      <Navigation storyProgress={storyProgress} />
      <World storyProgress={storyProgress} />
    </>
  );
}

function App() {
  const { active } = useProgress();
  const scrollProgress = useScrollProgress();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasStarted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const isLoading = !hasStarted || active;
  const storyProgress = normalizeStoryProgress(scrollProgress);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Experience storyProgress={storyProgress} />
    </>
  );
}

export default App;