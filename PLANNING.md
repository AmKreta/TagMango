# Mango - 9-Day Fitness Challenge App

## Planning Document

### Overview

A React + Vite application for a 9-day fitness challenge, built with Emotion styled-components. Users navigate through daily challenge tabs, view a community feed, create posts with file uploads, and track progress across days.

---

### Initial Analysis

#### Components Identified

| Component | Purpose |
|-----------|---------|
| **Tabs** | Generic tab system with `Container` and `Tab` sub-components |
| **AppTab** | Application-specific tab layout — sidebar navigation + tab content |
| **FeedPost** | Renders individual community posts with reactions, comments, pinning |
| **Modal** | Portal-based modal with overlay, click-outside detection |
| **Sidebar** | Slide-in panel with header/content/footer slots |
| **Typography** | Centralized text rendering with level-based presets |
| **Upload** | Drag-and-drop file upload with preview |
| **PillButton / CircularButton** | Reusable button primitives |
| **Image** | Responsive image wrapper with size and radius props |
| **InfoCard** | Title + value display card |
| **CloseButton** | Reusable close action with optional absolute positioning |

#### Requirements Identified

- **Dark mode** — full theme toggle between light and dark
- **Responsive** — mobile-friendly layout on small screens
- **State management** — challenge progress, day selection, post submission
- **Confetti celebration** — on post submission

---

### Architecture Decisions

#### 1. Theming Strategy — CSS Variables First

All design tokens live in `theme.css` as CSS custom properties. A parallel `theme.ts` file references these variables via `var(--...)` for use in Emotion styled-components.

**Why:** CSS variables resolve at render time, so toggling `data-theme-mode` on `<body>` instantly swaps every color without re-rendering React components. This makes dark mode essentially free — just override the variables in a `body[data-theme-mode="dark"]` block.

```
theme.css (source of truth)
  └── :root { --color-text: #211F26; ... }
  └── body[data-theme-mode="dark"] { --color-text: #EDEDEF; ... }

theme.ts (JS access)
  └── export const theme = { colors: { text: 'var(--color-text)', ... } }
```

**Rule:** Always use `theme.colors.*`, `theme.spaces.*`, etc. in styled-components. Never hardcode hex values. This ensures dark mode and future theme changes propagate automatically.

#### 2. Mixins for Reusable CSS Patterns

Complex or multi-property styles (like the border shorthand) are encapsulated in `mixins.ts` using Emotion's `css` helper. Components import and spread these instead of duplicating declarations.

#### 3. Dark Mode — SVG Inversion

Rather than editing every SVG file, a single CSS rule `svg { filter: invert(1); }` in the dark theme block handles icon color inversion. Background images use a `--bg-invert` CSS variable to opt into inversion per-component.

#### 4. Responsive — Minimal Effort, Maximum Impact

Since the screen has a simple sidebar + content layout, responsive design is straightforward:

- **Tabs sidebar**: hidden on mobile, slides in as a drawer via burger button
- **Feed / posts**: fixed widths become `width: 100%` on small screens
- **Sidebar (info panel)**: width becomes `75vw` on mobile
- **Burger button**: static in the app header (before logo), only visible on mobile

Breakpoint: `768px`

#### 5. State Management — React Context

A `ChallengeContext` manages all challenge-related state:

- `currentDay`, `selectedDay`, `totalDays`
- `completedDays`, `pendingDays`
- `userPost`, `showConfetti`
- Day status icons (completed = green tick, current = clock, pending = lock)

This avoids prop drilling for deeply nested components like Feed and FeedPost.

---

### Build Order

#### Phase 1: Foundation
1. Scaffold React + Vite + Emotion
2. Create `theme.css` with all design tokens (colors, spacing, typography, borders)
3. Create `theme.ts` as JS interface to CSS variables
4. Build `Typography` component with level-based presets
5. Build button primitives (`PillButton`, `CircularButton`)

#### Phase 2: Layout
6. Build App shell — header with logo, streak, notifications, profile
7. Build `Tabs` generic component (Container + Tab)
8. Build `AppTab` — sidebar navigation with tab content area
9. Build `ChallengeHeader` — back button, day counter, info icon

#### Phase 3: Core Features
10. Build `FeedPost` component — author, content, reactions, pinning
11. Build `Feed` — post list with header and create-post CTA
12. Build `Modal` — portal-based with click-outside hook
13. Build `Upload` — drag-and-drop with preview
14. Build `CreatePost` — modal with upload, submit, gradient border
15. Build `Sidebar` — slide-in panel with header/footer/content slots
16. Build `ChallengeInfo` — sidebar with challenge details

#### Phase 4: State & Interactivity
17. Create `ChallengeContext` — day tracking, post submission
18. Wire tab selection to context (`selectedDay`)
19. Post submission — random text, add to feed, hide create-post UI
20. Confetti celebration on submission (react-confetti with fade)

#### Phase 5: Polish
21. Dark mode — add dark theme variables, SVG inversion, toggle button
22. Responsive — media queries, mobile drawer, fluid widths
23. Concave tab corners — pseudo-elements with box-shadow trick
24. Workout background image — blurred + blended in tabs sidebar

---

### Component Dependency Graph

```
App
├── AppHeader (logo, burger, theme toggle, streak, bell, profile)
└── Challenge
    ├── ChallengeProvider (context)
    ├── ChallengeHeader
    │   ├── BackButton, Day Counter
    │   ├── InfoIcon → Sidebar (ChallengeInfo)
    │   └── Sidebar → CloseButton, Image, InfoCard, PillButton
    └── ChallengeContent
        └── AppTab
            ├── TabsContainer (day list with status icons)
            └── TabsContent
                └── Tabs.Container → Feed
                    ├── CreatePost → Modal → Upload
                    └── FeedPost (× N)
```

---

### Key Patterns Used

| Pattern | Where | Why |
|---------|-------|-----|
| CSS variables for theming | `theme.css` + `theme.ts` | Instant dark mode without re-renders |
| React Portals | Modal, Sidebar | Render outside DOM hierarchy to avoid z-index issues |
| `useOnClickOutside` hook | Modal, Sidebar | Deferred listener with `requestAnimationFrame` to prevent open-click-closes |
| Pseudo-element concave corners | AppTab active item | `::before`/`::after` with `box-shadow` for inverse rounded corners |
| `background-blend-mode` | TabsBg | Blend workout image with panel background color |
| CSS `filter: invert(1)` | Dark mode SVGs | Bulk icon color inversion without editing source files |
| Context + `setTimeout` | Confetti | Auto-dismiss confetti with phased fade-out |
| Prop drilling for layout state | `showTabs` | App header owns the burger, AppTab owns the drawer |

---

### File Structure

```
src/
├── assets/              # SVG icon components + images
├── components/
│   ├── appTab/          # AppTab + constants (tab statuses)
│   ├── CircularButton/
│   ├── closeButton/
│   ├── image/
│   ├── infoCard/
│   ├── modal/
│   ├── pillButton/
│   ├── sidebar/
│   ├── tabs/            # Generic Tabs (Container, Tab, types)
│   ├── typography/
│   └── upload/
├── hooks/
│   └── onClickOutside   # Click-outside detection hook
├── page/
│   └── challenge/
│       ├── index.tsx           # Challenge layout + provider
│       ├── ChallengeContext    # Provider implementation
│       ├── challengeContextDef # Interface + context object
│       ├── useChallengeContext # Consumer hook
│       ├── ChallengeHeader    # Header + sidebar trigger
│       ├── ChallengeContent   # Tab data wiring
│       ├── Feed               # Post list + confetti
│       ├── FeedPost           # Individual post
│       └── createPost         # Post creation modal
├── theme/
│   ├── theme.css        # CSS variables (light + dark)
│   ├── theme.ts         # JS references to CSS vars
│   └── mixins.ts        # Reusable Emotion css helpers
├── App.tsx              # App shell + header + theme toggle
└── main.tsx             # Entry point
```
