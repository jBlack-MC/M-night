interface CameraNavigation {
  goTo(section: string): void;
  currentSection(): string;
  availableSections(): string[];
}

interface Window {
  __cameraNav?: CameraNavigation;
}
