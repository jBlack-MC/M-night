# M-Night — 3D Interactive Portfolio

An immersive 3D web portfolio built with React, Three.js, and React Three Fiber. 

Experience a guided narrative journey through a chess-themed portfolio where a pawn represents you, and the chessboard tells your story.

## 🎯 Project Status

✅ **PHASE 1:** 3D Foundation (Chessboard + Pawn)  
✅ **PHASE 2:** Camera & Navigation (Guided storytelling experience)  
🚧 **PHASE 3:** Story Sections (Content overlays)  

## 🎨 Features

### 3D Scene
- **Chessboard:** Single, clean board with proper filtering
- **Pawn:** Positioned on board surface (represents you)
- **Optimized rendering:** Full-screen Three.js canvas
- **Responsive design:** Works on all screen sizes

### Camera System
- **5 Guided Perspectives:**
  - Hero (discovery)
  - About (personal)
  - Skills (capabilities)
  - Projects (showcase)
  - Contact (engagement)
- **Smooth Transitions:** 2-second easing animations
- **FOV Variations:** Different perspectives for each section
- **Console API:** `window.__cameraNav.goTo('section')`

### Navigation
- **Top Navigation Bar:** Responsive, glassmorphic design
- **Section Buttons:** Click to navigate between portfolio sections
- **Section Indicator:** Shows current location
- **Hide/Show Toggle:** Minimalist UI option

## 🚀 Tech Stack

- **Frontend:** React 19 + TypeScript
- **3D Graphics:** Three.js + React Three Fiber
- **UI Library:** @react-three/drei (utilities)
- **Build Tool:** Vite
- **Styling:** CSS Modules
- **Version Control:** Git

## 📁 Project Structure

```
M-Night/
├── public/
│   └── models/
│       ├── pawn.glb
│       └── chessboard.glb
│
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── World.tsx
│   │   │   ├── CameraController.tsx
│   │   │   ├── ChessBoard.tsx
│   │   │   ├── Pawn.tsx
│   │   │   └── Scene.tsx (deprecated)
│   │   ├── ui/
│   │   │   ├── Navigation.tsx
│   │   │   └── Navigation.module.css
│   │   └── sections/
│   │
│   ├── data/
│   │   └── cameraPresets.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── PHASE_1.md
├── PHASE_2.md
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🏃 Quick Start

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🎮 How to Use

### Navigation (Browser)
1. Click navigation buttons at top of page
2. Watch camera smoothly transition to new section
3. View section from unique perspective

### Navigation (Console)
```javascript
// Navigate to a section
window.__cameraNav.goTo('about')

// Check current section
window.__cameraNav.currentSection()  // → 'about'

// List all sections
window.__cameraNav.availableSections()
```

## 📸 Camera Presets

| Section | Position | FOV | Focus |
|---------|----------|-----|-------|
| Hero | [1.8, 1.0, 2.0] | 55° | Full scene |
| About | [0.8, 0.8, 1.0] | 50° | Pawn (you) |
| Skills | [1.2, 0.6, 1.2] | 48° | Board center |
| Projects | [0.5, 1.5, 0.5] | 52° | Overhead view |
| Contact | [1.5, 0.9, 1.5] | 54° | Dynamic angle |

## 📖 Documentation

- [PHASE 1 Documentation](./PHASE_1.md) - 3D Foundation details
- [PHASE 2 Documentation](./PHASE_2.md) - Camera & Navigation details

## 🛠️ Development

### Component Organization
- **3d/:** Three.js components (Canvas, Camera, Models)
- **ui/:** Navigation and UI overlays
- **sections/:** Future content sections
- **data/:** Configuration and presets

### Adding a New Camera Preset
1. Edit `src/data/cameraPresets.ts`
2. Add new preset object with position, target, FOV
3. Update `sectionOrder` array
4. Navigation automatically updates

### Customizing Camera Transitions
Edit `TRANSITION_DURATION` in `src/components/3d/CameraController.tsx`:
```typescript
const TRANSITION_DURATION = 2; // seconds
```

## 🐛 Known Limitations

- Placeholder pawn model (replace `public/models/pawn.glb` with actual chess pawn)
- No keyboard navigation yet (arrow keys, etc.)
- No mobile touch gestures for navigation
- No custom transition curves per section

## 🔮 Roadmap

### PHASE 3: Story Sections
- [ ] Text/content overlays
- [ ] Section-specific interactions
- [ ] Background blur when content visible

### PHASE 4: Pawn Interaction
- [ ] Click pawn to trigger actions
- [ ] Pawn animations/movement
- [ ] Story progression system

### PHASE 5: Polish & Effects
- [ ] Post-processing (bloom, color grading)
- [ ] Particle systems
- [ ] Sound design
- [ ] Loading states

## 📝 License

MIT

## 🎬 Credits

Built as an immersive 3D portfolio experience.

---

**Experience the story. Navigate the board. Become the pawn.**


```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
=======
# M-night
>>>>>>> b7fed43f3774a35dcf7bc8c40780ffec08be39c0
