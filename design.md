---
Name: snowball design system
Description: A minimalist, modern design system in a single standalone stylesheet — full light and dark themes that follow the OS by default, forceable either way. Built for accessible, typography-focused web interfaces using semantic HTML, no framework required.
Version: 1.3.0
Author: ffuffix
---

# 🐇 Snowball 1.3.0

This design system ships as **one standalone stylesheet** — `snowball.css`. No Tailwind, no build step. You write plain semantic HTML and link the stylesheet; the components are styled by tag, attribute, and ARIA role.

```html
<link rel="stylesheet" href="snowball.css" />
<!-- optional: theming knobs, loaded after -->
<link rel="stylesheet" href="snowball.config.css" />
```

Inter is the intended typeface — load it (e.g. from Google Fonts) or override `--sb-font`. Everything else has a sensible system fallback.

---

## Instructions & Rules (System Directives)
When generating UI with this design system, you **must** follow these rules:

1. **Use the semantic API — don't rebuild components.** Display-only components are custom tags (`<statcard>`, `<tag>`, `<progressbar>`, `<loadingspinner>`, `<codeblock>`, `<card>`, `<field>`, `<toast>`); interactive ones stay real elements styled by attribute or role (`<button variant="…">`, `role="switch|checkbox|radio"` + `aria-checked`, native `<input>`/`<textarea>`/`<select>`/`<input type="range">`, `<dialog>`, `[popover]`, `data-tooltip`). Reach for these before writing your own markup. In React/Vue use the hyphenated alias of each custom tag (`stat-card`, `loading-spinner`, `code-block`, …) so the framework treats them as custom elements.
2. **Theme via tokens, never hardcoded colors.** Every color is a `light-dark()` pair, so the system follows the OS color scheme automatically. Do **not** introduce arbitrary colors (`#3b82f6`, `rgb(...)`, a stray `blue`). The monochrome palette is built into the components; to change it, override the `--sb-*` tokens in `snowball.config.css`. The only chroma is the **red ⇄ emerald pair** (danger/error vs. success/positive) — a single structural slot where, anywhere one appears, the other is its natural opposite.
3. **Typography is Inter.** Load Inter or set `--sb-font`; the type scale and weights are already wired into the tags and helper classes.
4. **Geometry is fixed.** A component's size, padding, and proportions are not adjustable — adjust the surrounding layout instead. The only two shape knobs are corner radius (`--radius`) and hairline width (`--border`), settable per element or globally (see *Flexibility*).
5. **Provide the interactivity; the CSS does the visuals.** Every component *renders* with zero JavaScript. State for interactive controls lives entirely in attributes — toggling a switch/checkbox is one `setAttribute` flipping `aria-checked`; radios use a roving tabindex; the code-block copy button and toast lifecycle are a few lines. Reference implementations of all of this live in the `<script>` at the bottom of `components.html` — copy them as-is. Never make a component's *appearance* depend on JS.
6. **Don't fight the layer.** The whole sheet lives in `@layer snowball`, so any unlayered CSS you write overrides it without `!important`. Prefer overriding tokens over overriding rules.

---

## Foundation & Theme

### Theme & color model
Every color resolves through `light-dark()`, so by default the page follows the OS color scheme. Force a theme with `data-theme`:

```html
<html data-theme="dark">   <!-- whole page, the classic Snowball look -->
<section data-theme="light"> <!-- just this subtree -->
```

A themed **subtree** must paint its own opaque background, because the surface fills are translucent and assume one:
```html
<aside data-theme="light" style="background: var(--sb-bg)"> … </aside>
```
Browsers without `light-dark()` (pre-2024) are not supported.

### Tokens
The components are built from a small set of tokens. You rarely set these directly — the semantic markup pulls them — but reach for them when building a **custom surface** (a bespoke panel using `var(--sb-fill)` + a hairline), and override them in `snowball.config.css` to retheme. Never invent intermediate values; pick the nearest canonical token.

**Text (opacity steps, here shown for the dark theme):**

| Token | Step | Used for |
| :--- | :--- | :--- |
| `--sb-text` | full | Primary text, headings, metric values |
| `--sb-text-strong` | /90 | Near-primary body |
| `--sb-text-body` | /80 | Body paragraphs |
| `--sb-text-link` | /65 | Link rest state |
| `--sb-text-muted` | /55 | Muted / secondary, descriptions |
| `--sb-text-dim` | /40 | De-emphasized span inside a hero title |
| `--sb-text-micro` | /50 | Micro-label, footnote, stat label, field hint, placeholder — the WCAG-AA floor for small text |

**Surface fills:**

| Token | Step | Used for |
| :--- | :--- | :--- |
| `--sb-fill-faint` | /[0.01] | Faintest card fill (cards on a busy / dot-grid background) |
| `--sb-fill` | /[0.02] | Default card / panel / input fill |
| `--sb-fill-hover` | /[0.03] | Hover fill |
| `--sb-fill-track` | /[0.04] | Progress / slider track, tag fill |

**Hairlines** (rendered as inset box-shadows, composed from `--border` width × color):

| Token | Step | Used for |
| :--- | :--- | :--- |
| `--sb-line-quiet` | /[0.05] | Quiet card hairline (cards on busy backgrounds) |
| `--sb-line-card` | /[0.06] | Default card hairline |
| `--sb-line` | /[0.08] | Default button / input hairline |
| `--sb-line-strong` | /[0.16] | Hover / active / focus hairline |
| `--sb-line-danger` / `--sb-line-danger-strong` | — | Danger button & invalid-input hairline (rest / hover) |

**Accents** — `--sb-success` (emerald) and `--sb-danger` / `--sb-danger-text` (red) are the paired slot; change them together. `--sb-solid` / `--sb-on-solid` are the inverted surface (primary button, checked checkbox, toggle-on track).

**Radii:**

| Token | Value | Used for |
| :--- | :--- | :--- |
| `--sb-radius` | `0.25rem` | Tags, badges |
| `--sb-radius-control` | `4px` | Checkboxes |
| `--sb-radius-button` | `0.375rem` | Buttons, inputs |
| `--sb-radius-card` | `0.75rem` | Cards, panels, surfaces |
| `--sb-radius-pill` | `9999px` | Toggles, progress, avatars |

### Flexibility
Corner radius and hairline width are the two shape knobs a consumer may adjust. Both work **per element** and **globally**:

```html
<card style="--radius: 4px; --border: 2px"> … </card>   <!-- this element only -->
```
```css
/* globally, in snowball.config.css — every knob is listed at its default, ready to uncomment */
:root { --sb-radius-card: 0.5rem; --sb-border-width: 2px; }
```
Because hairlines are inset box-shadows, thickening `--border` never changes a component's outer size. Everything else about a component's geometry is fixed — do not stretch, shrink, or re-space components; adjust the layout instead.

### Spacing
Components carry their own padding (standard button `px-4 py-2`-equivalent, icon button a `2.25rem` square, tag `~3px/8px`). You don't set it — keep rhythm consistent by leaving component internals alone and spacing components apart with your layout.

### Accessibility & robustness
The system is built to stay usable beyond the happy path:

- **Contrast.** Text tokens from `--sb-text-micro` upward meet WCAG AA (4.5:1) for small text in both themes. `--sb-text-dim` is reserved for *large* hero text (the 3:1 threshold) and decorative glyphs — don't use it for body copy.
- **Reduced motion.** Decorative transitions collapse under `prefers-reduced-motion: reduce`; the spinner keeps rotating (it carries meaning) but drops the dash morph.
- **RTL.** Direction-sensitive placement (toggle thumb, select chevron, code-block label, copy button, toast stack) uses logical properties, so the system mirrors correctly under `dir="rtl"`.
- **Hit targets.** Every `<button>` carries an invisible expanded hit area, so a tap or click lands even when it falls slightly off the visible control.
- **`.sr-only`.** A visually-hidden utility for accessible names and live-region status text (e.g. a spinner's "Loading…").

---

## Typography

Headings are styled by tag; everything else has a helper class. (Each heading style also has a class — `.h1`, `.h2`, `.h3` — for when you need the look without the document outline.)

| Element / Role | Markup | Notes |
| :--- | :--- | :--- |
| **Page Title** (hero) | `<h1 class="page-title">` | Largest, high-impact title (`clamp` up to 8rem) |
| **H1** | `<h1>` or `.h1` | Standard main header |
| **H2** | `<h2>` or `.h2` | Section header |
| **H3** | `<h3>` or `.h3` | Subsection header (lighter weight) |
| **Body** | `<p>` | Readable paragraph, `--sb-text-body`, max-width ~36rem |
| **Title Description** | `.title-desc` | Muted subtitle paired with H2 / H3 |
| **Hero Description** | `.hero-desc` | Larger muted subtitle for an H1 / Page Title |
| **Muted Description** | `.muted-desc` | Captions, card descriptions, small print |
| **Micro-label** | `.micro-label` | 10px uppercase wide-tracked label (`--sb-text-muted`) |
| **Metric Value** | `.metric-value` | Large tabular number inside a stat card |
| **Link** | `<a>` or `.link` | `--sb-text-link` at rest → full on hover |

For a de-emphasized span inside a big title, wrap it and set `color: var(--sb-text-dim)`.

---

## Components

### Choosing the right component
Pick by **intent**, not appearance. If a row matches what the user is trying to do, use that component.

| Intent | Component |
| :--- | :--- |
| Primary call-to-action — the one thing on the page to do | **`<button variant="primary">`** |
| Alternative action next to a primary CTA | **`<button variant="secondary">`** (a bare `<button>` is secondary) |
| Destructive / irreversible action (delete, reset, leave) | **`<button variant="danger">`** |
| Cancel, dismiss, "not now", low-emphasis navigation | **`<button variant="ghost">`** |
| Icon-only action in a toolbar or row (copy, close, edit) | **`<button variant="icon">`** |
| A general bordered surface / panel / settings group | **`<card>`** (`<card quiet>` on busy backgrounds) |
| Single metric paired with a positive / negative delta | **`<statcard>`** |
| Status, category, or metadata label (read-only) | **`<tag>`** |
| Tabular data — rows and columns | **`<table>`** (`<th num>` / `<td num>` right-align numeric columns) |
| A person or entity's identity | **`<avatar>`** — overlap several with **`<avatargroup>`** |
| A keyboard key or shortcut hint | **`<kbd>`** |
| Boolean preference that takes effect immediately | **`role="switch"`** |
| Multi-select, opt-in, or form agreement | **`role="checkbox"`** |
| Pick exactly one from a small mutually exclusive set | **`role="radio"`** |
| Free-form text entry, single line | **`<input type="text">`** |
| Free-form text entry, multi-line | **`<textarea>`** |
| Pick one option from a long or unfamiliar list | **`<select>`** |
| Pick a numeric value from a continuous range | **`<input type="range">`** |
| Label + input + hint or error, stacked | **`<field>`** |
| Indeterminate in-progress state | **`<loadingspinner>`** |
| Determinate progress with a known percentage | **`<progressbar>`** |
| Placeholder for content that hasn't loaded yet | **`<skeleton>`** (`circle` for avatars) |
| Source code, config snippets, terminal output | **`<codeblock>`** |
| Blocking decision or focused task that interrupts the page | **`<dialog>`** |
| Secondary actions tucked behind a trigger | **`[popover]` menu** |
| Clarify an icon-only or ambiguous control on hover / focus | **`data-tooltip`** |
| Transient, non-blocking feedback after an action | **`<toast>`** |
| Persistent, in-flow status message or callout | **`<alert>`** (`success` / `danger` / neutral) |
| Switch between views/panels in the same context | **`role="tablist"`** + `role="tab"` / `role="tabpanel"` |
| Single-select among 2–4 inline options (view, density…) | **`<segmented role="radiogroup">`** |
| Show / hide a section on demand | **`<details>`** + `<summary>` |
| The user's location in the page hierarchy | **`<breadcrumbs>`** inside `<nav aria-label="Breadcrumb">` |

### Buttons
`<button variant="…">` — `primary`, `secondary`, `danger`, `ghost`, `icon`. A bare `<button>` renders as secondary. All buttons carry an invisible expanded tap target. Add `disabled` for the disabled state. Icon buttons need an `aria-label`.

```html
<button variant="primary">Get Started</button>
<button variant="secondary">Learn More</button>
<button variant="danger">Delete Project</button>
<button variant="ghost">Cancel</button>
<button variant="icon" aria-label="Copy">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
</button>
```

### Cards

#### Card
`<card>` is the standard bordered surface (default fill + card hairline) for panels, list rows, and settings groups. `<card quiet>` uses the faintest fill and quietest hairline — for cards sitting on the dot-grid or another busy background.
```html
<card>
  <h3 style="font-size: 1.125rem; font-weight: 600;">Standard card</h3>
  <p class="muted-desc" style="margin-top: 0.5rem;">Works for panels, list rows, and settings groups.</p>
</card>
```

#### Stat Card
One label, one number, one delta. `<statdelta up>` is the success accent, `<statdelta down>` the danger red, and a bare `<statdelta>` is neutral. The up/down pair is the only place success and danger appear *together*, forming a single bidirectional indicator — use a colored delta only when the direction is genuinely good or bad, never for a neutral change.
```html
<statcard>
  <statlabel>Revenue</statlabel>
  <statvalue>$24.8k</statvalue>
  <statdelta up>+12.4%</statdelta>
</statcard>
```

### Badges, Indicators & Progress

#### Tag / Badge
An uppercase, wide-tracked label for statuses or metadata (read-only).
```html
<tag>beta</tag>
```

#### Progress Bar
Determinate progress. Set the fill with `--value`; mirror it in the ARIA attributes and give it an `aria-label`.
```html
<progressbar style="--value: 60%" role="progressbar" aria-label="Upload" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></progressbar>
```

#### Loading Spinner
Indeterminate state. Sizes `sm` / (default) / `lg` / `xl`, or a custom `--size`. A spinner is silent to screen readers: give a meaningful one `role="status"` + an `aria-label` (or pair an `aria-hidden` spinner with `.sr-only` status text), and mark purely decorative ones `aria-hidden="true"`.
```html
<loadingspinner role="status" aria-label="Loading"></loadingspinner>
<loadingspinner size="lg" aria-hidden="true"></loadingspinner>
<loadingspinner style="--size: 56px" aria-hidden="true"></loadingspinner>
```

#### Skeleton
A shimmering placeholder for content that's still loading. Unlike other components it's *meant* to be sized to what it replaces — set `width` / `height` (and `--radius` to taste); add `circle` for an avatar placeholder. The shimmer drops to a static fill under `prefers-reduced-motion`. Mark a loading region `aria-busy="true"` and `aria-hidden` the skeletons themselves so a screen reader isn't read a wall of empty placeholders.
```html
<skeleton style="width: 60%"></skeleton>
<skeleton circle style="width: 2.25rem; height: 2.25rem"></skeleton>
```

#### Code Block
`<codeblock lang="…">` wraps a normal `<pre><code>`; the optional `lang` shows as a corner label. Syntax colors target Prism (`.token.*`), highlight.js (`.hljs-*`), and Shiki — and plain un-highlighted code works too. The palette is monochrome: opacity and weight carry the hierarchy, and **color appears only in diff lines** (`.token.inserted` = success, `.token.deleted` = danger).

A copy-to-clipboard button is part of the default anatomy — the reference script in `components.html` injects one into every block (writes the `<pre>`'s text, swaps the icon for a checkmark and the `aria-label` to "Copied" for ~1.5s). Opt a block out with `nocopy` (use it for diffs and terminal transcripts).
```html
<codeblock lang="js">
<pre><code><span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></code></pre>
</codeblock>

<codeblock lang="diff" nocopy>
<pre><code><span class="token deleted">- statusColor: 'blue'</span>
<span class="token inserted">+ statusColor: 'emerald'</span></code></pre>
</codeblock>
```
*Inline code (`<code>` outside a `<pre>`) renders as a subtle chip automatically.*

### Data display

#### Table
A plain native `<table>`. Header cells are uppercase micro-labels, rows are separated by the standard hairline (composed from `--border` × `--sb-line-card` at the cell, so a local `--border` override still works). Add `num` to a `<th>`/`<td>` to right-align it and switch on tabular figures for numeric columns. Use `<caption>` for an accessible table name. Wrap the table in a horizontally-scrollable container if it can overflow on narrow screens.
```html
<table>
  <caption>Recent deployments</caption>
  <thead>
    <tr><th>Project</th><th>Status</th><th num>Duration</th></tr>
  </thead>
  <tbody>
    <tr><td>snowball</td><td>Live</td><td num>1.2s</td></tr>
    <tr><td>preview</td><td>Building</td><td num>0.8s</td></tr>
  </tbody>
</table>
```

#### Avatar
`<avatar>` is a fixed circle holding initials or an `<img>`. Sizes `sm` / (default) / `lg`. Overlap several with `<avatargroup>` — the gap between them is a ring painted in `--sb-bg`, so on a non-page surface set `--sb-bg` to that surface's color. An image avatar still needs `alt`; an initials avatar should carry an `aria-label` with the full name.
```html
<avatar aria-label="Ada Lovelace">AL</avatar>
<avatar size="lg"><img src="…" alt="Ada Lovelace" /></avatar>

<avatargroup>
  <avatar aria-label="Ada Lovelace">AL</avatar>
  <avatar aria-label="Grace Hopper">GH</avatar>
  <avatar aria-label="Alan Turing">AT</avatar>
</avatargroup>
```

#### Keyboard key
`<kbd>` renders a single key as a keycap chip; combine a few for a shortcut.
```html
<kbd>⌘</kbd> <kbd>K</kbd>
```

### Inputs & Controls

Every control needs an accessible name — a visible `<label>` (via `<field>`), `aria-label`, or `aria-labelledby`. Glyph-only controls (switches, checkboxes, radios, icon buttons) have no text, so without one a screen reader announces "switch, on" with no clue what it controls.

**Interactivity:** switches and checkboxes hold their entire state in `aria-checked` — flip it on click (one line; see `components.html`). The CSS animates the rest.

#### Toggle Switch
```html
<button role="switch" aria-checked="true" aria-label="Email notifications"></button>
<button role="switch" aria-checked="false" aria-label="Marketing emails"></button>
```

#### Checkbox
```html
<button role="checkbox" aria-checked="true" aria-label="Accept terms"></button>
<button role="checkbox" aria-checked="false" aria-label="Subscribe to updates"></button>
```

#### Radio Button
Wrap a set in `role="radiogroup"`. The group must be a **single tab stop**: the selected radio carries `tabindex="0"`, the rest `-1`, and Arrow keys move both focus and selection (roving tabindex — see the script in `components.html`). Exactly one radio per group is `aria-checked="true"`.
```html
<div role="radiogroup" aria-label="Plan">
  <button role="radio" aria-checked="true" aria-label="Option one"></button>
  <button role="radio" aria-checked="false" aria-label="Option two"></button>
  <button role="radio" aria-checked="false" aria-label="Option three"></button>
</div>
```

#### Text Input & Textarea
Plain `<input>` / `<textarea>`. Focus brightens the hairline and lifts the fill — no outline ring. Use `disabled` for the disabled state. Mark an invalid field with `aria-invalid="true"` (swaps to the danger hairline) and describe the error in text linked via `aria-describedby`.
```html
<input type="text" placeholder="Project name" aria-label="Project name" />
<textarea placeholder="Describe the change…"></textarea>

<input type="email" value="not-an-email" aria-label="Email" aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" class="muted-desc" style="color: var(--sb-danger-text);">Enter a valid email address.</p>
```

#### Select
A native `<select>`, restyled to match the text input with an inline chevron. Where `appearance: base-select` is supported (Chromium), the open dropdown is upgraded to a hairline panel via `::picker(select)`; other engines keep the recolored native dropdown. Give each `<option>` plain text — the stylesheet handles the rest.
```html
<select aria-label="Environment">
  <option>Production</option>
  <option>Staging</option>
  <option>Development</option>
</select>
```

#### Slider
A native `<input type="range">` reusing the progress-bar track language with a solid inverted thumb that compresses slightly while dragged.
```html
<input type="range" min="0" max="100" value="60" aria-label="Volume" />
```

#### Field
The stacking pattern for forms: `<label>`, then the control, then a `<fieldhint>` — or a `<fielderror>` when the control is `aria-invalid`. Always link the hint/error with `aria-describedby`.
```html
<field>
  <label for="project">Project name</label>
  <input id="project" type="text" placeholder="my-project" aria-describedby="project-hint" />
  <fieldhint id="project-hint">Lowercase letters and dashes only.</fieldhint>
</field>

<field>
  <label for="email">Email</label>
  <input id="email" type="email" value="not-an-email" aria-invalid="true" aria-describedby="email-err" />
  <fielderror id="email-err">Enter a valid email address.</fielderror>
</field>
```

### Navigation & disclosure

#### Tabs
`role="tablist"` holds `button[role="tab"]`s; each tab `aria-controls` a `role="tabpanel"`, and the active tab is `aria-selected="true"` with a matching underline. The tablist is a **single tab stop** (roving tabindex, like radios): the selected tab is `tabindex="0"`, the rest `-1`, Arrow keys move selection, and inactive panels carry `hidden`. Reference script in `components.html`.
```html
<div role="tablist" aria-label="Project">
  <button role="tab" id="t-overview" aria-controls="p-overview" aria-selected="true">Overview</button>
  <button role="tab" id="t-activity" aria-controls="p-activity" aria-selected="false" tabindex="-1">Activity</button>
</div>
<div role="tabpanel" id="p-overview" aria-labelledby="t-overview">…</div>
<div role="tabpanel" id="p-activity" aria-labelledby="t-activity" hidden>…</div>
```

#### Segmented control
A compact single-select for 2–4 short options (a view or density switch). It's a `<segmented role="radiogroup">` of `button[role="radio"]`s — so it reuses the radio roving-tabindex script, with the round-dot look overridden to filled segments.
```html
<segmented role="radiogroup" aria-label="View">
  <button role="radio" aria-checked="true">Board</button>
  <button role="radio" aria-checked="false" tabindex="-1">List</button>
  <button role="radio" aria-checked="false" tabindex="-1">Timeline</button>
</segmented>
```

#### Accordion
A native `<details>` rendered as a bordered surface; `<summary>` is the header with a chevron that rotates on open. Works with zero JS. Keep the disclosed body in a single element.
```html
<details>
  <summary>What's included?</summary>
  <p class="muted-desc">Every component, both themes, and the reference interactivity snippets.</p>
</details>
```

#### Breadcrumbs
`<breadcrumbs>` of `<a>` links with generated `/` separators; the current page is the last child carrying `aria-current="page"` (render it as plain text, not a link). Wrap it in `<nav aria-label="Breadcrumb">` for the landmark.
```html
<nav aria-label="Breadcrumb">
  <breadcrumbs>
    <a href="#">Home</a>
    <a href="#">Projects</a>
    <span aria-current="page">Snowball</span>
  </breadcrumbs>
</nav>
```

### Feedback

#### Alert / Callout
A persistent, in-flow message — the quieter counterpart to the transient `<toast>`. `<alert success>` / `<alert danger>` tint the leading dot (the same paired slot the toast uses); a bare `<alert>` is neutral. Add an `<alerttitle>` for a heading line. Because color alone can't carry meaning, make the text say what the dot implies.
```html
<alert>
  <alerttitle>Heads up</alerttitle>
  <p>Your trial ends in three days.</p>
</alert>

<alert success><p>Changes saved.</p></alert>

<alert danger>
  <alerttitle>Couldn't save</alerttitle>
  <p>Check your connection and try again.</p>
</alert>
```

### Overlays
One panel surface (solid `--sb-panel` background, strong hairline, soft drop shadow), four shapes. All overlay motion is a short fade/slide, gated behind `prefers-reduced-motion: no-preference`.

#### Dialog
A native `<dialog>` opened with `showModal()` — focus trapping, Esc, and `method="dialog"` close come free. The backdrop dims and blurs the page.
```html
<button onclick="document.getElementById('confirm').showModal()">Delete project…</button>
<dialog id="confirm">
  <h3>Delete project?</h3>
  <p class="muted-desc" style="margin-top: 0.5rem;">This permanently removes the project and all of its data.</p>
  <footer>
    <form method="dialog"><button variant="ghost">Cancel</button></form>
    <button variant="danger">Delete</button>
  </footer>
</dialog>
```

#### Menu (Popover)
Any `[popover]` renders as a panel. Use the native `popovertarget` for open/close and light-dismiss, and CSS anchor positioning to pin it to its trigger (`anchor-name` on the trigger, `position-anchor` + `anchor()` on the panel). Where anchor positioning is unsupported the panel centers — acceptable as a fallback; wire JS positioning if the menu is critical. A danger item uses `variant="danger"`.
```html
<button popovertarget="menu" style="anchor-name: --menu">Options</button>
<menu id="menu" popover style="position-anchor: --menu; inset: auto; margin: 0; top: calc(anchor(bottom) + 4px); left: anchor(left); min-width: 11rem; list-style: none;">
  <button>Rename</button>
  <button>Duplicate</button>
  <hr />
  <button variant="danger">Delete</button>
</menu>
```

#### Tooltip
A `data-tooltip` attribute on any element that doesn't already use its `::after` (not switches, checkboxes, radios, or the copy button). Appears after a ~300ms delay on hover/focus, hides immediately. For clarifying ambiguous controls only — never for content that matters, since it's hover/focus-only. It always opens upward and can't flip, so it may clip near the top or side edges of the viewport — another reason to keep the text short and the content non-essential. The tooltip is **not** the accessible name: keep `aria-label` even when the tooltip repeats it.
```html
<button variant="icon" aria-label="Copy" data-tooltip="Copy to clipboard"> …icon… </button>
```

#### Toast
Transient, non-blocking confirmation. A `<toaster aria-live="polite">` container holds a bottom-right stack; append `<toast>` elements (`<toast success>` / `<toast danger>` for a colored status dot, bare for neutral). Auto-dismiss after ~4s by setting the `closing` attribute, then removing the element ~200ms later — see the `toast()` helper in `components.html`.
```html
<toaster aria-live="polite">
  <toast success>Project saved</toast>
</toaster>
```

---

## Exceptions & Special Cases

#### Very Impactful Text
For the most important hero statements, pair the page title with a de-emphasized continuation:
```html
<h2 class="page-title">Quietly making<br><span style="color: var(--sb-text-dim)">things that last.</span></h2>
```

#### Descriptions for Large Titles
Use `.hero-desc` (larger and wider than `.title-desc`) to support an H1 or page title:
```html
<p class="hero-desc">This subtitle supports the main title, providing additional context.</p>
```

#### Text over shaders or busy backgrounds
When the background is busy, keep text legible with full-opacity color and a subtle shadow:
```html
<h1 class="page-title" style="text-shadow: 0 2px 24px rgba(0,0,0,0.45);">Let's<br>talk.</h1>
```

---

*Prefer inline utility classes? The `--sb-*` tokens above map cleanly onto a Tailwind theme if you'd rather generate the markup that way — but `snowball.css` is the canonical implementation, and the semantic API is what keeps the design rules unbreakable.*
