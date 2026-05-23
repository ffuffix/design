---
Name: snowball design system
Description: A minimalist, dark-themed design system optimized for readability and high-contrast interactions. Made for accessible, modern web interfaces with a focus on typography and subtle visual cues.
Version: 1.0.0
Author: ffuffix
---

# 🐇 Snowball 1.0.0

This design system is built entirely on **Tailwind CSS**. 

---

## Instructions & Rules (System Directives)
When generating UI components or layouts using this design system, you **must** adhere to the following rules:
1. **Dark Theme Default**: The background of the canvas or page must always be dark (e.g., `bg-black` or `bg-[#0a0a0a]`). Most text styles use semi-transparent white (`text-white/55`, `text-white/65`) which is invisible on light backgrounds.
2. **Typography strictly Inter**: Ensure the parent element or body has `font-sans` (configured to Inter) applied.
3. **No Arbitrary Colors**: Do not introduce random Tailwind colors (like `bg-blue-500` or `text-gray-300`). Stick strictly to the monochrome (white/black) palette, using only the canonical opacity steps below, plus the documented `red` accents for danger / error and the success emerald (see *Success accent* in Foundation) for positive / confirmation states.
   - **Text opacity**: `/35` (micro-label, footnote, table caption), `/40` (de-emphasized span inside a hero title), `/55` (muted), `/65` (link rest), `/80` (body), `/90` (near-primary), full white for primary.
   - **Surface fill**: `/[0.01]` (faintest card fill — for cards sitting on a busy background like the dot-grid), `/[0.02]` (default card / panel fill), `/[0.03]`–`/[0.04]` (hover fill, progress track).
   - **Border via inset shadow rgba**: `0.05`–`0.06` (quiet card hairline), `0.08` (default button / input hairline), `0.14`–`0.16` (hover / active hairline).
   - Do not invent intermediate values (`/70`, `/[0.1]`, `0.18`). If a step seems missing, pick the nearest canonical one.
4. **Touch Target Protection**: Interactive elements like buttons, checkboxes, and toggles use pseudo-elements for larger tap targets (`before:absolute before:-inset-2 before:content-['']`). Do not remove these classes.
5. **Preserve Transitions**: Always include transition properties (`transition-colors`, `transition-all`, `duration-300`) to keep animations smooth.

---

## Foundation & Theme

### Colors & Backgrounds
- **Primary Page Background**: `bg-black` or `bg-[#09090b]`
- **Card / Container Background**: `bg-white/[0.02]` with border `border border-white/[0.08]`
- **Text Primary**: `text-white` or `text-white/90`
- **Text Secondary / Muted**: `text-white/55`
- **Accents**: White, transparent white overlays, soft red (`red-500`, `red-300`) for danger / error, and emerald (see *Success accent* below) for positive / confirmation states. Red and emerald are a **paired structural slot** — anywhere one appears (delta, status, badge), the other is the natural opposite.
- **Success accent**: `text-emerald-400/90` (Tailwind's `emerald-400` resolves to `oklab(0.765 -0.169466 0.0510908)` — the same color, just expressed via the utility). Use for positive deltas, "copied to clipboard", build / sync success markers, and any state telling the user *something good just happened*. Do not pair this with neutral text in a single phrase — it should always carry meaning on its own (a label, a number, an icon).

### Tokens
The same values recur across every component. Reach for these before inventing new ones.

| Token | Value | Used for |
| :--- | :--- | :--- |
| **Radius / small** | `rounded` | Tags, badges |
| **Radius / control** | `rounded-[4px]` | Checkboxes |
| **Radius / button** | `rounded-md` | Buttons, icon buttons |
| **Radius / card** | `rounded-xl` | Cards, panels, surface containers |
| **Radius / pill** | `rounded-full` | Toggles, progress bars, avatars |
| **Border / card** | `shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]` | Card hairline (use `0.05` for cards on busy backgrounds) |
| **Border / rest** | `shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]` | Default 1px hairline for buttons / inputs |
| **Border / hover** | `shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]` | Hover / active hairline |
| **Border / danger rest** | `shadow-[inset_0_0_0_1px_rgba(239,68,68,0.22)]` | Danger button rest |
| **Border / danger hover** | `shadow-[inset_0_0_0_1px_rgba(239,68,68,0.4)]` | Danger button hover |
| **Tap target** | `relative before:absolute before:-inset-2 before:content-['']` | All small interactive elements (`-inset-3` for toggles/checkboxes) |
| **Transition / colors** | `transition-colors duration-200` | Background / text color changes only |
| **Transition / all** | `transition-all duration-300` | When border / shadow / position also animates |

### Spacing scale
Components stick to a narrow set of paddings to keep rhythm consistent.

| Role | Padding |
| :--- | :--- |
| **Standard button** | `px-4 py-2` |
| **Ghost / compact button** | `px-3 py-1.5` |
| **Icon button** | `w-9 h-9` (square) |
| **Tag / badge** | `px-2 py-[3px]` |

---

## Typography

Use the following classes for text elements to maintain strict visual hierarchy.

| Element / Role | Tailwind Classes | Description / Example Usage |
| :--- | :--- | :--- |
| **Page Title** (Large) | `text-6xl sm:text-8xl md:text-9xl font-semibold tracking-tight text-white leading-[0.9]` | Hero headings, high-impact titles |
| **H1** | `text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-white leading-[0.95]` | Standard main section header |
| **H2** | `text-4xl sm:text-5xl font-semibold tracking-tight text-white` | Secondary section header |
| **H3** | `text-2xl sm:text-3xl tracking-tight text-white` | Subsection header |
| **Paragraph / Body** | `text-base sm:text-lg max-w-xl leading-relaxed text-white/80` | Readable body paragraphs |
| **Title Description** | `text-white/55 text-base sm:text-lg max-w-xl leading-relaxed` | Default subtitle, paired with H2 / H3. For hero H1 / Page Title pairings, use the larger variant in *Descriptions for Large Titles* below. |
| **Muted Description** | `text-[13px] sm:text-sm leading-relaxed text-white/55 line-clamp-3` | Captions, card descriptions, small text |
| **Metric Value** | `text-3xl font-medium tabular-nums leading-none text-white` | Large number inside a Stat Card |
| **Metric Delta** | `text-[11px] tabular-nums` paired with `text-emerald-400/90` (positive) or `text-red-300/90` (negative) | Paired delta indicator below a Metric Value |
| **Interactive Link** | `text-sm text-white/65 hover:text-white transition-colors duration-300` | Inline or navigation links |

---

## Components

### Choosing the right component
Pick by **intent**, not by appearance. If a row matches what the user is trying to do, use that component.

| Intent | Component |
| :--- | :--- |
| Primary call-to-action — the one thing on the page to do | **Primary Button** |
| Alternative action shown next to a primary CTA | **Secondary Button** |
| Destructive / irreversible action (delete, reset, leave) | **Danger Button** |
| Cancel, dismiss, "not now", low-emphasis navigation | **Ghost Button** |
| Icon-only action in a toolbar or row (copy, close, edit) | **Icon Button** |
| Single metric paired with a positive / negative delta | **Stat Card** |
| Status, category, or metadata label (read-only) | **Tag / Badge** |
| Boolean preference that takes effect immediately | **Toggle Switch** |
| Multi-select, opt-in, or form agreement | **Checkbox Button** |
| Indeterminate in-progress state | **Loading Spinner** |
| Determinate progress with a known percentage | **Progress Bar** |

### Buttons
All buttons feature an invisible expanded click area using the `before:` pseudo-element for accessibility.

#### Primary Button
*Best for primary call-to-actions.*
```html
<button class="
  inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium select-none relative
  bg-white text-black hover:bg-white/90 active:bg-white/80 
  transition-colors duration-200
  before:absolute before:-inset-2 before:content-['']
">
  Get Started
</button>
```

#### Secondary Button
*Best for secondary options, outline appearance.*
```html
<button class="
  inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium select-none relative
  text-white/80 hover:text-white hover:bg-white/[0.02]
  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]
  transition-all duration-300
  before:absolute before:-inset-2 before:content-['']
">
  Learn More
</button>
```

#### Danger Button
*Best for destructive actions (e.g., delete, reset).*
```html
<button class="
  inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium select-none relative
  text-red-300 hover:text-red-200 hover:bg-red-500/[0.06]
  shadow-[inset_0_0_0_1px_rgba(239,68,68,0.22)] hover:shadow-[inset_0_0_0_1px_rgba(239,68,68,0.4)]
  transition-all duration-300
  before:absolute before:-inset-2 before:content-['']
">
  Delete Project
</button>
```

#### Ghost Button
*Best for subtle, low-emphasis navigation or actions.*
```html
<button class="
  inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium select-none relative
  text-white/55 hover:text-white hover:bg-white/[0.03]
  transition-colors duration-200
  before:absolute before:-inset-2 before:content-['']
">
  Cancel
</button>
```

#### Icon Button
*Best for small, icon-only actions (e.g., close, edit).*
(This example uses a copy icon from the Lucide icon set, but you can replace it with any SVG icon.)
```html
<button aria-label="Copy" class="inline-flex items-center justify-center w-9 h-9 rounded-md text-white/60 hover:text-white hover:bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-all duration-300 relative before:absolute before:-inset-2 before:content-['']"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy w-3.5 h-3.5" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button>
```

### Cards

#### Stat Card
*One label, one number, one delta. The delta is the only place the success accent and red `red-300/90` appear as a pair — together they form a single bidirectional indicator (up vs. down, gained vs. lost, on-track vs. off-track). Never use the success accent here for a neutral or informational change — only when the direction of the delta is genuinely good.*

*Uses the **card** radius (`rounded-xl`), the faintest **surface fill** (`/[0.01]`) since stat cards typically sit on the dot-grid background, and the quietest **card hairline** (`0.05`). The micro-label uses the `/35` text step.*
```html
<div class="
  w-full max-w-[14rem] rounded-xl p-5 flex flex-col gap-1
  bg-white/[0.01]
  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]
">
  <span class="text-[10px] font-semibold uppercase tracking-widest text-white/35 whitespace-nowrap">
    Revenue
  </span>
  <span class="text-3xl font-medium tabular-nums text-white leading-none mt-1">
    $24.8k
  </span>
  <!-- Swap the delta color based on direction:    -->
  <!--   positive → text-emerald-400/90            -->
  <!--   negative → text-red-300/90                -->
  <span class="text-[11px] tabular-nums mt-1 text-emerald-400/90">
    +12.4%
  </span>
</div>
```

### Badges, Indicators & Progress

#### Loading Spinner
*A highly animated SVG spinner for loading states.*
```html
<svg class="w-5 h-5 text-white animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-opacity="0.15" stroke-width="2" />
  <circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
    class="origin-center"
    style="stroke-dasharray: 42 150; stroke-dashoffset: 0;">
    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="2s" repeatCount="indefinite"></animateTransform>
    <animate attributeName="stroke-dasharray" values="0 150;42 150;42 150" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite"></animate>
    <animate attributeName="stroke-dashoffset" values="0;-16;-59" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite"></animate>
  </circle>
</svg>
```

#### Progress Bar
*A subtle track containing a rounded indicator bar.*
```html
<div class="w-full max-w-[10rem] h-1 bg-white/[0.04] rounded-full overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
  <!-- Set dynamic width on inner div for progress value -->
  <div class="h-full bg-white/70 rounded-full transition-all duration-300" style="width: 60%;" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
</div>
```

#### Tag / Badge
*An uppercase, wide-tracked tag for labels or statuses.*
```html
<span class="inline-flex items-center px-2 py-[3px] text-[10px] font-semibold uppercase tracking-widest text-white/55 bg-white/[0.04] rounded whitespace-nowrap">
  beta
</span>
```

### Inputs & Controls

#### Toggle Switch
*Two states. Swap the track classes and the handle's `left` value together — never just one.*
```html
<!-- State: ON -->
<button role="switch" aria-checked="true" class="
  inline-flex w-9 h-5 rounded-full relative items-center transition-colors duration-300
  bg-white/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
  before:absolute before:-inset-3 before:content-['']
">
  <span class="absolute top-0.5 w-4 h-4 rounded-full bg-black shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-all duration-300" style="left: 18px;"></span>
</button>

<!-- State: OFF -->
<button role="switch" aria-checked="false" class="
  inline-flex w-9 h-5 rounded-full relative items-center transition-colors duration-300
  bg-white/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
  before:absolute before:-inset-3 before:content-['']
">
  <span class="absolute top-0.5 w-4 h-4 rounded-full bg-white/55 shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-all duration-300" style="left: 2px;"></span>
</button>
```

#### Checkbox Button
*Two states. The unchecked state is border-only (inset shadow) with no fill and no icon; the checked state fills white and renders a black checkmark.*
```html
<!-- State: Checked -->
<button role="checkbox" aria-checked="true" class="
  inline-flex items-center justify-center w-4 h-4 rounded-[4px] relative transition-all duration-300
  bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]
  before:absolute before:-inset-3 before:content-['']
">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-3 h-3 text-black" aria-hidden="true">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
</button>

<!-- State: Unchecked -->
<button role="checkbox" aria-checked="false" class="
  inline-flex items-center justify-center w-4 h-4 rounded-[4px] relative transition-all duration-300
  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]
  before:absolute before:-inset-3 before:content-['']
"></button>
```




### Exceptions & Special Cases

#### Very Impactful Text
*For the most important, high-contrast hero titles or statements, you can use a custom combination of classes to create a striking visual effect. This is not a standard text style but can be used for special cases where you want to make a bold statement on the page.*
```html
<h2 class="text-6xl sm:text-8xl md:text-9xl font-semibold tracking-tight text-white leading-[0.9]">Quietly making<br><span class="text-white/40">things that last.</span></h2>
```

#### Readable Project Title
*For project titles that need to be readable at smaller sizes, you can use a combination of text size and opacity to ensure clarity while maintaining the design aesthetic.*
```html
<h2 class="text-4xl sm:text-5xl font-semibold tracking-tight text-white">Project 1</h2>
```

#### Descriptions for Large Titles
*When you have a large title (like an H1 or Page Title) and want to provide a supporting description, you can use the Title Description style to create a clear hierarchy and maintain readability.*
```html
<p class="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl">This is a subtitle that supports the main title, providing additional context or information.</p>
```

#### When Using Shaders Or Other Visual Effects For The Background, The Text Should Stand Out
*If your design includes a shader or a busy background, ensure that the text remains legible by using higher opacity for the text color and possibly adding a subtle text shadow for better contrast.*
```html
<h1 style="color: rgb(255, 255, 255); text-shadow: rgba(0, 0, 0, 0.45) 0px 2px 24px; transition: color 600ms cubic-bezier(0.16, 1, 0.3, 1), text-shadow 600ms cubic-bezier(0.16, 1, 0.3, 1);" class="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[0.92]">Let's<br>talk.</h1>
```