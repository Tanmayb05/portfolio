# Portfolio Theme Switcher Implementation Plan

## 📋 Plan: Adding a Linktree-Style Theme Switcher

Based on analysis of the codebase, here's a detailed plan to add a **second theme option** (Linktree-style gradient theme) alongside the existing yellow-black minimalist theme.

---

## 🎯 Overview

**Goal**: Add a theme switcher button next to the dark/light toggle that allows users to switch between:
- **Theme A**: Current minimalist yellow-black theme (existing)
- **Theme B**: Linktree-style gradient theme with centered layout (new)

**Approach**: Extend the current `data-theme` system to support 4 states instead of 2:
- `minimalist-dark` (current "dark")
- `minimalist-light` (current "light")
- `linktree-dark` (new)
- `linktree-light` (new)

---

## 🏗️ Current Architecture Analysis

### Framework/Tech Stack
- **Vanilla JavaScript** (no React, Vue, or npm dependencies)
- **Static HTML** with modular ES6 JavaScript modules
- **CSS** with custom CSS properties (variables) for theming
- **Ion Icons** library for SVG icons
- **Build System**: JavaScript bundler (outputs `script-bundled.js`)

### Current Dark/Light Mode Toggle Implementation

**JavaScript Module** (`assets/js/modules/theme-toggle.js`):
- Uses `data-theme` attribute on `<html>` element (values: "dark" or "light")
- Stores preference in `localStorage` with key `'theme'`
- Defaults to "dark" mode
- Has audio feedback with `click_button.wav` sound (0.35 volume)
- Two toggle buttons: desktop (#theme-toggle) and mobile (#theme-toggle-mobile)

### Theme/Styling Configuration

**CSS Variables File** (`assets/css/modules/variables.css`):
- Defines all colors in `:root` for dark mode (default)
- Uses CSS custom properties: `--jet`, `--onyx`, `--eerie-black-1`, `--white-1`, `--orange-yellow-crayola`, etc.
- Includes gradients, shadows, typography variables, and transitions
- Has a complete `[data-theme="light"]` section that redefines all variables for light mode

### State Management
- **No framework state management** (React Context, Redux, etc.)
- **localStorage**: Persists theme choice across sessions with key `'theme'`
- **DOM attribute**: `data-theme` on `<html>` element for CSS variable scope
- **Direct DOM manipulation**: JavaScript directly sets attributes and listens to click events

---

## 📐 Implementation Plan

### Phase 1: CSS Variables & Theme Definition

**File**: `assets/css/modules/variables.css`

#### Tasks:

1. **Rename existing theme attributes**:
   - Change `:root` → `[data-theme="minimalist-dark"]`
   - Change `[data-theme="light"]` → `[data-theme="minimalist-light"]`

2. **Add new Linktree theme variables**:
   - Create `[data-theme="linktree-dark"]` section with:
     - Background: `linear-gradient(180deg, #6789C9 0%, #8DB1E0 100%)`
     - Card backgrounds: white with opacity (`rgba(255, 255, 255, 0.9)`)
     - Accent color: Green (`#2E7D32`) or blue variant
     - Border radius: 16-20px for all cards
     - Enhanced shadows for depth

   - Create `[data-theme="linktree-light"]` section (similar but lighter gradient)

3. **Add Linktree-specific layout variables**:
   ```css
   --linktree-max-width: 480px;
   --linktree-card-radius: 20px;
   --linktree-card-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
   ```

---

### Phase 2: Theme Toggle Logic Enhancement

**File**: `assets/js/modules/theme-toggle.js`

#### Tasks:

1. **Update localStorage structure**:
   ```javascript
   // Current: stores 'dark' or 'light'
   // New: stores object { style: 'minimalist'|'linktree', mode: 'dark'|'light' }
   ```

2. **Create new functions**:
   - `toggleThemeStyle()` - switches between minimalist ↔ linktree
   - `toggleThemeMode()` - switches between dark ↔ light (existing function refactored)
   - `setTheme(style, mode)` - applies the theme combination
   - `getThemeState()` - retrieves current theme from localStorage

3. **Update initialization**:
   - Read both style and mode from localStorage
   - Default to `{ style: 'minimalist', mode: 'dark' }` for first-time visitors
   - Backward compatibility: if old localStorage format detected, migrate to new format

4. **Add sound effect** for style toggle (similar to mode toggle)

#### Backward Compatibility Code:
```javascript
// Pseudo-code for backward compatibility
function migrateOldTheme() {
  const oldTheme = localStorage.getItem('theme'); // 'dark' or 'light'
  if (oldTheme && !localStorage.getItem('themeState')) {
    const newState = {
      style: 'minimalist',
      mode: oldTheme
    };
    localStorage.setItem('themeState', JSON.stringify(newState));
    localStorage.removeItem('theme'); // Clean up old key
  }
}
```

---

### Phase 3: UI Button Creation

**Files**:
- `index.html` (lines ~158-163 for desktop, ~1377-1380 for mobile)
- New file: `assets/css/modules/style-toggle.css`

#### Tasks:

1. **Add new toggle button in HTML** (next to theme toggle):
   ```html
   <!-- Desktop -->
   <button class="style-toggle" id="style-toggle" data-style-toggle>
     <ion-icon name="grid-outline" class="minimalist-icon"></ion-icon>
     <ion-icon name="link-outline" class="linktree-icon"></ion-icon>
   </button>

   <!-- Mobile (in sidebar) -->
   <button class="style-toggle" id="style-toggle-mobile" data-style-toggle>
     <ion-icon name="grid-outline" class="minimalist-icon"></ion-icon>
     <ion-icon name="link-outline" class="linktree-icon"></ion-icon>
   </button>
   ```

2. **Create style-toggle.css** (modeled after `theme-toggle.css`):
   - Position next to theme toggle button
   - Show/hide icons based on `data-theme` attribute
   - Responsive sizing for mobile/tablet/desktop
   - Hover effects and transitions

3. **Import new CSS** in `assets/css/style.css`

---

### Phase 4: Linktree Layout Components

**Files**:
- New file: `assets/css/modules/linktree-layout.css`
- `index.html` - conditional class application

#### Tasks:

1. **Create Linktree-specific CSS**:
   ```css
   /* Only applies when data-theme contains "linktree" */
   [data-theme^="linktree"] .main-content {
     display: flex;
     flex-direction: column;
     align-items: center;
     max-width: var(--linktree-max-width);
     margin: 0 auto;
   }

   [data-theme^="linktree"] .sidebar {
     /* Hide sidebar or convert to centered profile card */
     display: none; /* OR transform to centered card */
   }

   [data-theme^="linktree"] .navbar {
     /* Convert navigation to link cards */
   }
   ```

2. **Card-style transformations**:
   - Convert sections (About, Projects, Skills) into floating cards
   - Add proper spacing with `gap` or `margin`
   - Apply rounded corners and shadows
   - Center all text alignment

3. **Typography adjustments**:
   - Load `Inter` or `Nunito Sans` font (add to HTML `<head>`)
   - Override font-family in Linktree theme
   - Adjust weights: 600 for headings, 400 for body

---

### Phase 5: Integration & Testing

#### Tasks:

1. **Update `assets/js/script.js`**:
   - Ensure `initThemeToggle()` still runs first
   - Add initialization for style toggle listeners

2. **Add backward compatibility**:
   - Detect old localStorage format (`'theme': 'dark'`)
   - Migrate to new format (`'themeState': '{"style":"minimalist","mode":"dark"}'`)
   - Preserve user's existing dark/light preference

3. **Test matrix**:
   - [ ] minimalist-dark → minimalist-light (existing behavior works)
   - [ ] minimalist-dark → linktree-dark (new style toggle)
   - [ ] linktree-dark → linktree-light (mode toggle in new theme)
   - [ ] linktree-light → minimalist-light (style toggle preserves mode)
   - [ ] localStorage persistence across page reloads
   - [ ] Mobile toggle buttons work correctly
   - [ ] Sound effects play for both toggles
   - [ ] No layout breaks on responsive breakpoints

4. **Edge cases**:
   - User has audio blocked (already handled gracefully)
   - localStorage disabled/unavailable
   - Theme flash on page load prevention
   - Multiple rapid toggle clicks

---

## 📁 Files to Create/Modify

### Modify (5 files):
1. `assets/css/modules/variables.css` - Add linktree theme CSS variables
2. `assets/js/modules/theme-toggle.js` - Add style toggle logic
3. `index.html` - Add style toggle buttons (2 locations)
4. `assets/css/style.css` - Import new CSS modules
5. `assets/js/script.js` - Initialize style toggle (if needed)

### Create (2 files):
1. `assets/css/modules/style-toggle.css` - Button styling
2. `assets/css/modules/linktree-layout.css` - Layout transformations

---

## 🎨 Linktree Theme Specifications

| Element | Value |
|---------|-------|
| **Background Gradient** | `linear-gradient(180deg, #6789C9 0%, #8DB1E0 100%)` |
| **Card Background** | `rgba(255, 255, 255, 0.9)` |
| **Card Shadow** | `0 4px 12px rgba(0, 0, 0, 0.1)` with hover: `0 6px 16px rgba(0, 0, 0, 0.15)` |
| **Border Radius** | `20px` for cards/buttons |
| **Max Width** | `480px` (centered) |
| **Font** | `Inter` or `Nunito Sans` (load from Google Fonts) |
| **Font Weight** | 600 (headings), 400 (body) |
| **Accent Color** | `#2E7D32` (green) or keep signature blue |
| **Text Align** | Center everything |
| **Profile Image** | Circular (`border-radius: 50%`), 2px white border |

---

## 🎨 Linktree Theme Design Requirements

### Layout Simplification

Convert from **multi-section navigation** (About, Resume, Skills, Projects, Travel) to:

- **Single centered column** (max-width ~480px)
- **Scrollable one-page layout** — no horizontal sections
- **Order of components:**
  ```
  [ Profile Image ]
  [ Name + Title ]
  [ Short tagline/about line ]
  [ Link Cards / Buttons (GitHub, Resume, Projects, etc.) ]
  [ Footer or mini bio ]
  ```

### Link Cards Section

Replace navbar/buttons ("About | Resume | Skills…") with link cards:

Each link should be a **full-width rounded button/card** — similar to Linktree:

```html
<a href="https://github.com/Tanmayb05"
   class="w-full bg-white bg-opacity-90 text-gray-900 font-semibold text-center py-3 rounded-xl shadow hover:shadow-md transition-all duration-200">
   💻 GitHub
</a>
```

**Suggested links:**
- Portfolio (this site)
- GitHub
- LinkedIn
- LeetCode
- Resume (PDF)
- Spotify / Steam / Instagram (optional lower priority)

### Typography & Content Simplification

| Element | Current | Change To |
|---------|---------|-----------|
| **Font** | System UI | Use `Inter`, `Poppins`, or `Nunito Sans` (Google Fonts) |
| **Weight** | Mix of 300–700 | Keep consistent — 600 for headings, 400 for body |
| **Text Align** | Left in some areas | Center everything |
| **Tagline** | "Hi, I'm Tanmay…" paragraph | Shorten to one-liner bio like: *"Software Developer & AI/ML Engineer at UCincinnati"* |

### Component Adjustments

#### Profile Image
- Make it **circular** (`rounded-full`)
- Add **border (2px solid white)** + subtle shadow
- Slight zoom on hover for interactivity

#### Cards/Buttons
- Use uniform height + spacing (`space-y-3`)
- Smooth hover with scale or color change:
```css
transition: all 0.25s ease-in-out;
transform: scale(1.03);
```

#### Footer (optional)
- Add minimal footer:
  *"Built with ❤️ using React + Tailwind | © 2025 Tanmay Bhuskute"*

---

## ⚙️ Optional Enhancements (Phase 6+)

1. **Smooth transitions** between themes (CSS transitions on background)
2. **Preview mode** - Hover over style toggle to preview theme briefly
3. **Keyboard shortcuts** - Alt+T for mode toggle, Alt+S for style toggle
4. **Theme picker modal** - 2×2 grid showing all 4 combinations
5. **URL parameter support** - `?theme=linktree-light` to share themed links
6. **Animation** - Framer Motion or CSS animations for theme switch

---

## 📊 Timeline Estimate

| Phase | Estimated Time | Complexity |
|-------|---------------|------------|
| Phase 1: CSS Variables | 2-3 hours | Medium |
| Phase 2: Toggle Logic | 3-4 hours | High |
| Phase 3: UI Buttons | 1-2 hours | Low |
| Phase 4: Linktree Layout | 4-6 hours | High |
| Phase 5: Testing | 2-3 hours | Medium |
| **Total** | **12-18 hours** | - |

---

## ✅ Success Criteria

- [ ] User can toggle between minimalist and Linktree themes using a button
- [ ] Dark/light mode works independently within each theme style
- [ ] Theme preference persists across page reloads
- [ ] No layout breaks on mobile/tablet/desktop
- [ ] Smooth visual transitions between themes
- [ ] Sound feedback on both toggles
- [ ] Backward compatible with existing user preferences
- [ ] Linktree theme matches the gradient/centered aesthetic specified

---

## 📚 Reference: Example Linktree Layout (React + Tailwind)

```jsx
export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#6789C9] to-[#8DB1E0] text-center text-gray-900 p-6">
      <img src="/my-avatar.png" alt="Tanmay Bhuskute" className="w-32 h-32 rounded-full shadow-lg border-4 border-white mb-4" />
      <h1 className="text-2xl font-semibold">Tanmay Bhuskute</h1>
      <p className="text-gray-700 mb-6">Software Developer · AI/ML Engineer</p>

      <div className="w-full max-w-sm space-y-3">
        <a href="https://github.com/Tanmayb05" className="block bg-white bg-opacity-90 py-3 rounded-xl shadow hover:shadow-md hover:scale-105 transition-all font-medium">💻 GitHub</a>
        <a href="https://linkedin.com/in/tanmay-bhuskute" className="block bg-white bg-opacity-90 py-3 rounded-xl shadow hover:shadow-md hover:scale-105 transition-all font-medium">🔗 LinkedIn</a>
        <a href="https://tanmayb05.github.io/portfolio" className="block bg-green-700 text-white py-3 rounded-xl shadow hover:bg-green-800 transition-all font-medium">🌐 Portfolio</a>
        <a href="/resume.pdf" className="block bg-white bg-opacity-90 py-3 rounded-xl shadow hover:shadow-md hover:scale-105 transition-all font-medium">📄 Resume</a>
      </div>

      <footer className="mt-6 text-xs text-gray-100 opacity-75">© 2025 Tanmay Bhuskute</footer>
    </div>
  );
}
```

---

## 🔑 Key Implementation Notes

### Current File Structure
```
portfolio/
├── index.html          # Main HTML file (1394 lines)
├── assets/
│   ├── css/
│   │   ├── style.css   # Main CSS import file
│   │   └── modules/
│   │       ├── variables.css      # Theme CSS variables ⭐
│   │       ├── theme-toggle.css   # Toggle button styling ⭐
│   │       └── [other modules]
│   ├── js/
│   │   ├── script.js              # Main JS entry point ⭐
│   │   └── modules/
│   │       ├── theme-toggle.js    # Theme logic ⭐
│   │       └── [other modules]
│   └── images/
└── data/
```

### Key Files for Theme Switcher Enhancement

| File Path | Purpose | What to Change |
|-----------|---------|----------------|
| `assets/js/modules/theme-toggle.js` | Theme toggle logic | Add style toggle function, update localStorage handling |
| `assets/css/modules/variables.css` | Theme colors | Add linktree-dark and linktree-light CSS variables |
| `assets/css/modules/theme-toggle.css` | Button styling | Reference for creating style-toggle.css |
| `index.html` (lines 158-163, 1377-1380) | HTML elements | Add style toggle buttons next to theme toggle |
| `assets/js/script.js` | Module initialization | Add style toggle initialization |
| `assets/css/style.css` | CSS imports | Import new style-toggle.css and linktree-layout.css |

---

## 🚀 Implementation Approach

### Recommended Order:
1. **Start with Phase 1** (CSS Variables) - Foundation for both themes
2. **Implement Phase 2** (Toggle Logic) - Core functionality
3. **Add Phase 3** (UI Buttons) - User interface
4. **Build Phase 4** (Linktree Layout) - Visual transformation
5. **Complete Phase 5** (Testing) - Quality assurance

### Validation Steps After Each Phase:
- Phase 1: Check if CSS variables are properly scoped to data-theme attributes
- Phase 2: Test localStorage persistence and theme state retrieval
- Phase 3: Verify buttons appear and are clickable on all screen sizes
- Phase 4: Confirm layout transforms correctly for linktree theme
- Phase 5: Run full test matrix and edge case scenarios

---

## 💡 Design Philosophy

**Goal**: Maintain the current minimalist portfolio experience while offering an alternative Linktree-inspired theme that:
- Uses the same content (no duplication)
- Transforms layout with CSS only
- Preserves accessibility and responsiveness
- Provides seamless switching between themes
- Maintains user preferences across sessions

**Constraint**: Pure vanilla JavaScript implementation (no framework dependencies)

---

## 📝 Notes for LLM Context

- This is a **static HTML/CSS/JS portfolio** website (no build tools required)
- Current theme system uses **CSS custom properties** scoped by `data-theme` attribute
- All theme logic is in **pure JavaScript modules** (no React/Vue/Angular)
- **Two toggle buttons** exist (desktop + mobile) that need to be duplicated for style toggle
- **Sound effects** are part of the UX (audio feedback on toggle)
- **localStorage** is the persistence mechanism (no backend)
- Project uses **Ion Icons** for iconography
- Current font is **Poppins** (Google Fonts)

---

## 🎯 End Goal

A portfolio website with **two distinct visual themes**:

1. **Minimalist Theme** (existing):
   - Sidebar navigation
   - Section-based layout
   - Yellow-orange accent colors
   - Professional portfolio feel

2. **Linktree Theme** (new):
   - Centered single-column layout
   - Gradient background
   - Card-based link presentation
   - Modern, clean aesthetic

Both themes support **dark/light modes** independently, giving users 4 total options:
- minimalist-dark
- minimalist-light
- linktree-dark
- linktree-light
