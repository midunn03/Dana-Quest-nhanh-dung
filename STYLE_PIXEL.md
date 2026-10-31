# DaNa Quest — bright pixel system

The coast is open, sunny and inviting. Clean readable surfaces occupy about 80% of each screen; original pixel art, stepped edges, short labels and rewards supply the other 20%. A single expressive illustration may lead a page. Controls and player information stay quiet and readable.

## Tokens

`src/ExperienceTokens.css` is the single token source. Primitive `--px-*` colors feed semantic surface/action/success tokens. Legacy `--dq-*` aliases point to the same source while existing screens migrate.

| Role | Color |
| --- | --- |
| Ink, borders, dark sections | Navy `#0F2B5B` |
| Primary actions / XP | Yellow `#FFC21A`, orange `#FF9F1C` |
| Success / progress | Green `#4ADE80` |
| Coast / exploration | Sky `#2FA4F5`, pale sky `#E4F4FF` |
| Position markers / warning only | Coral `#F0452F` |
| Page / surface | Cream `#FFF7E0`, white `#FFFFFF` |

Use navy text on light surfaces, yellow, green and sky. Use white on navy. Coral is reserved for location markers and warning edges; keep warning copy navy on cream. Never use pale green or yellow text on cream.

## Type and spacing

Vietnamese UI uses self-hosted Tiny5 Regular. English UI and explicit lang=en labels use Game Paused when a licensed webfont is supplied; currently the authorized self-hosted Pixelify Sans Bold fallback supplies the English outlines. Both CSS faces expose weight 400, font-synthesis is none, and monospace is the final fallback. Typography comes only from --font-vi/--font-en/--font-ui in ExperienceTokens.css. Existing --px-font* refer to the current language context.

Use fixed 24/32/40/48/64/80px type steps (96/112/144/176px only for existing decorative displays). Default prose, supporting UI and inputs are 24px for Tiny5 readability, with 1.8 prose leading and .04em tracking. Responsive changes use media queries. Vietnamese headings, controls and navigation use CSS uppercase; user-entered text and prose retain their content. Quest reading defaults to 24px and offers 24/32/40px via the existing presentation control. The canonical navigation height is 80px desktop and 112px mobile plus safe area, allowing two-line 24px labels.

Use the 4px spacing grid: 4, 8, 12, 16, 24, 32, 48, 64px. Main content stays near 1280px, with at least 20px mobile gutters. One dominant yellow or sky accent per view. All targets are at least 44px high.

## Edges and elevation

No soft radii, blurred shadows or smooth gradients. Borders are 4px navy; the shared button/card adds 4px side steps. Hard downward shadow has three levels: low 4px, mid 8px, high 12px. Flat surfaces omit the shadow. Leave 8px horizontal room for the step. Focus uses a 4px yellow outline with a 4px gap; place focused controls against navy borders so the focus remains identifiable.

## Shared primitives

Import from `src/ui/PixelUI.tsx`; styles load automatically. Named `Pixel*` exports also have short aliases.

| Component | Contract |
| --- | --- |
| Button | Native button props, `variant=primary/secondary/ghost/danger`, `size=sm/md/lg`, `loading`. Disabled/loading blocks duplicate activation. Default type is button; forms explicitly use submit. |
| Card | Native section props, `elevation=flat/low/mid/high`. |
| Badge | Native span props, `tone=yellow/green/sky/cream`. |
| ProgressBar | `value`, optional `max`, required accessible `label`. Clamps unsafe/out-of-range values, segmented green fill. |
| Modal | Native modal dialog, `open`, `onClose`, `title`, optional translated `closeLabel`. Browser provides focus trap and focus restoration. Escape/backdrop requests close. |
| Toast | `tone=info/success/error`; polite status by default, error alert. Owner determines lifetime. |
| Input | Required visible `label`, native input props, optional `hint`/`error`; associates descriptions and invalid state. |
| Tab | Native button with `selected`; parent owns tablist, panel relationships, arrow-key navigation and selection. |
| Tooltip | `content`, `children`; keyboard-focusable disclosure with tooltip association. Never place essential instructions only here. |
| Accordion | Native details/summary, `title`, children, optional `open`; works with keyboard and without script. |

Existing semantic UI may use the equivalent `.px-*` CSS classes without replacing business handlers. Preserve navigation links as anchors and native control semantics.

## Icons and illustrations

`PixelIcons.tsx` contains original 16×16 icons: pin, star, gift, lock, compass, map, xp, coin. Render at integer multiples of 16 (16/32/48/64); default size is 32px. SVG uses crisp edges. Decorative icons are hidden from accessibility; meaningful standalone icons need a title or labeled parent button. Never redraw icon details with arbitrary fractional coordinates. Raster art uses `image-rendering: pixelated`.

## Motion

Animate only transform and opacity. Button lift is 3px; press is 3px downward, duration 160ms with `cubic-bezier(.2,.8,.2,1)`. Modal/toast reveal is 12px over 180ms. Loading spinner uses eight steps. XP fill scales from its left origin, preserving layout. Native accordion content has a short opacity/translation entrance; no animated layout height. Avoid perpetual decoration, keep effects local to user actions, and pause any page-owned loops when out of view. Reduced motion removes transforms, transitions, entrances and spinners while preserving visible busy state and all functionality.

## Review checklist

Check VI/EN at 390, 768, 1280px and wide desktop. Inspect visible labels, native keyboard activation, focus, native modal dismissal and focus restoration, disabled/loading actions, long copy, empty/error states and reduced motion. Use actual game data; never manufacture player counts, points or rewards. Shared primitives contain no auth, storage, API or game logic.
