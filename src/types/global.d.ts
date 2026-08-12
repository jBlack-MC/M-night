/**
 * Global type declarations for camera navigation API
 */

interface CameraNavigation {
  goTo: (sectionName: string) => void;
  currentSection: () => string;
  availableSections: () => string[];
}

declare global {
  interface Window {
    __cameraNav: CameraNavigation;
  }
}

export {};
