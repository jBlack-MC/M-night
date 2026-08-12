# PHASE 3 — Hero World

## Overview

PHASE 3 introduces the hero section—the gateway to the portfolio experience. When visitors first enter the site, they're greeted with an elegant overlay featuring the M-Night branding, a call-to-action, and their first view of the 3D chess world with a subtle orbiting camera.

## The Experience

```
                    M-NIGHT

                       ♟

                 CHESS WORLD

             "MAKE YOUR MOVE"

                  ↓ START
```

### What Happens

1. **Entry Screen** - Visitor arrives at the portfolio
2. **Animated Overlay** - Hero section fades in with staggered animations:
   - Title "M-NIGHT" appears first
   - Pawn symbol (♟) floats and glows
   - Subtitle "SOFTWARE DEVELOPER" appears
   - Description text reveals
   - CTA button "↓ START" appears last
3. **Background 3D Animation** - Camera slowly orbits the chess world while hero is visible
4. **Minimal Text** - Hero section overlays readable text on the 3D world
5. **User Entry** - Click "START" button to enter the full experience and show navigation

## Architecture

### Component Hierarchy

```
World
├── HeroSection (PHASE 3)
│   ├── Overlay container
│   ├── Title + Pawn symbol
│   ├── Subtitle + Description
│   ├── CTA Button
│   └── Animations (staggered)
├── Canvas (3D)
│   ├── CameraController (enhanced with orbit)
│   ├── Lights
│   ├── ChessBoard
│   └── Pawn
└── Navigation (shown after hero)
```

### Files Added

```
src/
├── components/
│   └── sections/
│       ├── HeroSection.tsx        (NEW)
│       └── HeroSection.module.css (NEW)
├── components/3d/
│   └── World.tsx (UPDATED - integrates HeroSection)
└── CameraController.tsx (UPDATED - added orbit animation)
```

## Component Details

### HeroSection.tsx

The hero overlay component that greets visitors.

**Props:**
- `onEnter?: () => void` - Callback when user clicks START

**State:**
- `isVisible: boolean` - Controls overlay visibility
- `showTitle, showSubtitle, showDescription, showCTA: boolean` - Staggered animations

**Key Features:**
- Staggered fade-in animations (300ms → 800ms → 1400ms → 2000ms)
- Glassmorphic design with backdrop blur
- Responsive typography (clamp functions for all sizes)
- Click handler that hides overlay and triggers camera transition
- Window.__cameraNav integration

**Animations:**
- `fadeInUp` (300ms) - Elements slide up while fading in
- `float` (3s infinite) - Pawn symbol bobs up and down
- `pulse` (2s infinite) - Hint text fades in/out

### HeroSection.module.css

Styling for the hero experience.

**Key Classes:**
- `.heroOverlay` - Fixed fullscreen container with pointer events
- `.gradientBg` - Radial gradient + backdrop blur creating semi-transparent overlay
- `.heroContent` - Centered flex container for all text elements
- `.title` - Large M-NIGHT text with letter spacing and glow effect
- `.pawnSymbol` - Large floating chess pawn with animation
- `.subtitle` - "SOFTWARE DEVELOPER" uppercase text
- `.description` - Multi-line descriptive text
- `.ctaButton` - Glassmorphic button with hover effects
- `.hint` - Bottom hint text with pulse animation

**Responsive Breakpoints:**
- `@media (max-width: 768px)` - Tablet adjustments
- `@media (max-width: 480px)` - Mobile adjustments

### World.tsx (Updated)

Enhanced to include the hero section.

**Changes:**
- Added `HeroSection` import
- Added `heroComplete` state to track when user enters
- HeroSection shows on initial load
- Navigation only shows after `heroComplete === true`
- Updated console logging to mention PHASE 3

**Flow:**
```javascript
const [heroComplete, setHeroComplete] = useState(false);

<HeroSection onEnter={() => setHeroComplete(true)} />
{heroComplete && <Navigation />}
```

### CameraController.tsx (Updated)

Enhanced with subtle orbiting animation during hero view.

**New Features:**
- `orbitTimeRef` - Tracks orbit animation time
- `isHeroRef` - Boolean flag tracking if currently on hero preset
- Orbit animation activates when `currentPreset === "hero"`
- Smooth circular motion around the board while on hero
- Subtle vertical bobbing for added interest

**Orbit Animation Code:**
```typescript
orbitTimeRef.current += 0.003; // Very slow rotation

const heroPreset = cameraPresets["hero"];
const basePos = new THREE.Vector3(...heroPreset.camera.position);
const radius = basePos.length();
const angle = orbitTimeRef.current;

// Gentle circular motion around the board
perspCamera.position.x = Math.cos(angle) * radius * 0.95;
perspCamera.position.z = Math.sin(angle) * radius * 0.95;
perspCamera.position.y = basePos.y + Math.sin(angle * 0.5) * 0.1;

// Always look at center of board
perspCamera.lookAt(0, 0.2, 0);
```

**Behavior:**
- When transitioning away from hero, orbit animation is disabled
- Hero preset resets orbit timer on entry
- Smooth transitions maintain existing behavior

## Styling Details

### Typography

All text uses `clamp()` for responsive sizing:

```css
font-size: clamp(min, preferred, max);
```

Example - Title:
- Minimum: `3rem` (mobile)
- Preferred: `10vw` (responsive to viewport)
- Maximum: `6rem` (desktop)

### Colors

- **Background:** Dark theme `#111111` with radial overlay
- **Primary text:** White `#ffffff`
- **Secondary text:** Light gray `#b0b0b0` / `#d0d0d0`
- **Pawn symbol:** Cream `#e0d5b7` (matches chess aesthetic)

### Glassmorphic Design

```css
background: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.1),
  rgba(255, 255, 255, 0.05)
);
border: 1px solid rgba(255, 255, 255, 0.3);
backdrop-filter: blur(10px);
```

Creates a frosted glass effect over the 3D scene.

### Animations

**Fade In (0.8s):**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Float (3s infinite):**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

**Pulse (2s infinite):**
```css
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
```

## User Flow

1. User arrives at portfolio
2. Hero section overlay appears with staggered animations
3. Background 3D scene is visible with slowly orbiting camera
4. User reads title, subtitle, and description
5. User clicks "START" button
6. Hero section fades out
7. Navigation UI appears
8. User can now navigate between portfolio sections

## Customization

### Changing Hero Text

Edit `HeroSection.tsx`:

```typescript
<h1 className={styles.title}>M-NIGHT</h1>
<p className={styles.subtitle}>SOFTWARE DEVELOPER</p>
<div className={styles.description}>
  <p>Building software.</p>
  <p>Learning.</p>
  {/* Add or modify description lines */}
</div>
```

### Adjusting Animation Timing

In `HeroSection.tsx`, modify the timeout values:

```typescript
const timers = [
  setTimeout(() => setShowTitle(true), 300),       // ← Adjust
  setTimeout(() => setShowSubtitle(true), 800),    // ← Adjust
  setTimeout(() => setShowDescription(true), 1400), // ← Adjust
  setTimeout(() => setShowCTA(true), 2000),        // ← Adjust
];
```

### Changing Orbit Speed

In `CameraController.tsx`:

```typescript
orbitTimeRef.current += 0.003; // ← Increase for faster orbit
```

### Adjusting Gradient Overlay

In `HeroSection.module.css`:

```css
.gradientBg {
  background: radial-gradient(
    circle at center,
    rgba(17, 17, 17, 0.3) 0%,    /* ← Inner opacity */
    rgba(0, 0, 0, 0.7) 100%      /* ← Outer opacity */
  );
}
```

## Performance Notes

- Hero overlay is lightweight (single div with CSS animations)
- Orbit animation uses `requestAnimationFrame` (efficient)
- Backdrop blur is GPU-accelerated on modern browsers
- No additional 3D models loaded for hero section
- Existing 3D scene continues rendering during hero display

## Testing Checklist

- [ ] Page loads with hero overlay visible
- [ ] All text animations play in correct sequence
- [ ] Pawn symbol floats smoothly
- [ ] Camera orbits smoothly in background
- [ ] "START" button is clickable
- [ ] Clicking START hides hero and shows navigation
- [ ] Camera transitions work after hero
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] No performance drops during animations

## Browser Compatibility

- ✓ Chrome/Edge 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Notes

- [ ] Add `aria-label` to hero overlay
- [ ] Make CTA button keyboard accessible
- [ ] Consider adding `prefers-reduced-motion` support
- [ ] Add alt text or aria descriptions for pawn symbol

## Next Steps (PHASE 4+)

- Add section-specific hero content variants
- Implement keyboard shortcuts to skip hero
- Add sound design / background music
- Create story progression system
- Add particle effects to hero view
- Implement parallax scrolling within hero

## Debug Commands

```javascript
// Manually navigate to sections
window.__cameraNav.goTo('hero');
window.__cameraNav.goTo('about');

// Check current section
window.__cameraNav.currentSection();

// List all available sections
window.__cameraNav.availableSections();

// Manually trigger hero component
// (Would need to modify World state - skip for now)
```

## Summary

PHASE 3 delivers an immersive entry experience that:
- ✅ Greets visitors with elegant branding
- ✅ Showcases the 3D chess world immediately
- ✅ Provides smooth camera orbiting animation
- ✅ Guides user into the portfolio with clear CTA
- ✅ Maintains responsive design across all devices
- ✅ Uses glassmorphic design for visual sophistication

The hero section sets the tone for an interactive, narrative-driven portfolio experience.
