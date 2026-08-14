# M-Night

M-Night is an interactive portfolio built with React, TypeScript, Three.js, and React Three Fiber. A chessboard and pawn remain visible as a small interactive reference while visitors move through the portfolio.

## Current experience

- Desktop uses a two-column layout: portfolio content scrolls beside a sticky 3D stage.
- Mobile keeps the stage in normal document flow for a predictable reading order.
- Portfolio sections (`About`, `Skills`, `Projects`, `Experience`, and `Contact`) share one scroll-progress source with the camera compositions in [`src/data/storyScenes.ts`](src/data/storyScenes.ts).
- The stage supports drag rotation, `Alt` + mouse-wheel zoom, double-click reset, and a reset button.
- Reduced-motion preferences disable ambient camera drift and shorten interface motion.

## Project structure

```text
src/
  components/3d/       ThreeDStage, camera controller, board, and pawn
  components/sections/ Portfolio content sections
  components/ui/       Navigation and loading UI
  data/                Lighting, model transforms, and portfolio compositions
  hooks/               Scroll-progress state
public/models/         Pawn and board GLB assets
```

## Development

```bash
npm install
npm run dev
```

Use the following checks before publishing changes:

```bash
npm run lint
npm run build
```

## 3D composition flow

The portfolio composition list is the authoritative camera model. Navigation scrolls to semantic section IDs; `useScrollProgress` updates the normalized page position; `CameraController` selects and interpolates the matching composition. Asset paths and model transforms are maintained separately from the presentation labels.

## Accessibility and performance notes

The stage includes screen-reader instructions, visible keyboard focus styles, reduced-motion handling, capped rendering density, and a visible in-canvas model-loading fallback. Production dependencies are split into React, Three.js, and general vendor chunks for better browser caching. Remaining performance and accessibility work is tracked in the repository issues and requires browser/device verification.
