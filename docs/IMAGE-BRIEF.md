# Image Production Brief

This document specifies every runtime image the product needs. All images are loaded from `public/images/` and referenced by the illustration components in `src/components/illustrations/`. Generate the files, drop them in, and the UI renders them without any code changes.

---

## Global art direction

All four slots live inside a dark, slate-toned interface. A single coherent visual family matters more than individual beauty.

**Mood and subject**

- Rural Eastern Cape, South Africa: learners, classrooms, homes, the school yard, landscape.
- Confident and warm, not sorrowful. The story is "this works today, offline", not poverty.
- Learners are Grades 10-12 (roughly 15-19 years old), school uniform variants are welcome.
- Everyday realism: a phone in a hand at dusk, a chalkboard, a home desk lit by a phone screen.

**Style**

- Pre-darkened scenes that sit comfortably on the `#0F172A-#131C2E` card backgrounds.
- Semi-flat digital illustration with gradient lighting, or softly graded photography-styled renders. Pick one style and keep it consistent across all four slots.
- Composition: generous negative space on at least two edges so the image can breathe inside its container; key subject slightly off-center.

**Palette anchors**

| Role | Hex | Use |
|---|---|---|
| Canvas / deep slate | `#0F172A` | backgrounds and shadows |
| Slate midtones | `#1E293B` / `#334155` | device bodies, buildings, secondary shapes |
| Primary indigo | `#6366F1` → `#818CF8` | key glows, screens, highlights |
| Success emerald | `#10B981` → `#34D399` | connectivity, progress, hope accents |
| Warm amber | `#F59E0B` → `#FBBF24` | only for reward / sunlight accents |
| Light slate text/skin | `#E2E8F0` | figure highlights, device screens |

Do not introduce orange-red, purple-magenta, or large white fields. Saturated areas should be small; most of the image should stay in the slate range with indigo/emerald accents doing the storytelling.

**Strictly avoid**

- Any text, letters, numbers, letters-as-logos, or UI strings inside the images.
- Bright white backgrounds or pure highlights larger than 10 percent of the frame.
- Generic Western classroom stock tropes (locker rows, yellow US buses, flags).
- Faces rendered in uncanny detail at small sizes; keep faces simplified or turned away.

**Export targets**

| Slot files | Format | Dimension check |
|---|---|---|
| `public/images/*.png` each slot, falling back to connectivity.png. Actual files | `.png` | match the ratios below, render at 2x |

Keep files under 250 KB each. Deliver only the PNG for a given slot name; missing slots automatically show connectivity.png; WebP is acceptable later with a one-line `src` change per component.

---

## Slot 1 — offline-sync

**File:** `public/images/offline-sync.png` (component: `OfflineSyncIllustration`, used in the landing "How offline-first works" panel)

**Ratios and render size:** aspect `640 x 220` (32:11). Generate at `1280 x 440` or larger.

**Scene:** the one-time sync moment. Wide landscape composition reading left to right:

1. Left third: single-story rural school building with a modest antenna or router mast, warm windows lit indigo from inside; a faint emerald wifi arc radiating from the building.
2. Middle third: a dashed or dotted signal trail flowing rightward, subtly indigo-to-emerald.
3. Right third: a learner's hand holding a smartphone, screen glowing; the cloud above it deliberately faded, desaturated, or drawn as a soft outline so the "cloud not needed" story reads instantly.
4. Ground line or subtle horizon rule connecting all three zones near the bottom edge.

**Key rule:** the phone must be "alive" (bright screen, indigo/emerald accents) while the cloud is "asleep". That contrast is the whole diagram's argument.

---

## Slot 2 — connectivity

**File:** `public/images/connectivity.png` (component: `ConnectivityGrid`, used in the landing insight band, sits above a two-line data caption rendered in code)

**Ratios and render size:** aspect `300 x 130` (30:13). Generate at `1200 x 520` or larger. This is the smallest and densest slot; keep it iconic, not detailed.

**Scene:** the digital divide in one frame.

1. Dominant view: a spread of small township/rural homes seen from above or at an elevated angle, arranged in a loose grid or scattered cluster across a dark terrain.
2. Within the scene, roughly one in ten homes glows indigo (fixed internet at home); next to or on nearly every other home a tiny emerald point pulses (phone ownership almost universal).
3. Very small suggestion of a school building toward one edge with a light beam, tying the cluster to the hotspot story.

**Key rule:** the indigo glow must be rare and unmistakable; the emerald points must be everywhere. Avoid symmetry -- a hand-placed, scattered arrangement reads truer than a perfect grid.

---

## Slot 3 — secure-device

**File:** `public/images/secure-device.png` (component: `SecureDeviceIllustration`, used as the auth sidebar visual beside sign-in and reset flows)

**Ratios and render size:** aspect `360 x 300` (6:5, nearly square). Generate at `1080 x 900` or larger. It is the largest and most subject-heavy slot.

**Scene:** the learner's safety net. A stylized phone at center, upright, screen seen at a three-quarter tilt showing abstract lesson rows or a check state. Around it, orbiting softly:

1. A check node (emerald) -- progress saved on the device.
2. A star node (amber) -- badges and levels earned.
3. A plus node (indigo) -- a lesson queued or a teacher's note.
4. A book node (emerald outline) -- the offline library itself.

Thin orbital ring or two, centered radial indigo glow behind the phone, and a framing crop where the orbits nearly touch the canvas edges. Optional: a learner silhouette's hand entering from a corner holding the device, kept dark and unrounded so the device stays the hero.

**Key rule:** the shield or lock metaphor is already in the code styling history; if you include one, keep it small and subordinate to the phone. Trust comes from calm, ordered composition.

---

## Slot 4 — learning-path

**File:** `public/images/learning-path.png` (component: `LearningPathIllustration`, used inside the landing "problem and opportunity" card as a horizontal strip)

**Ratios and render size:** aspect `400 x 120` (10:3, a slim banner). Generate at `1600 x 480` or larger and mind the crop margins: the far left and far right 5 percent may be clipped on narrow screens.

**Scene:** the quest line. A gently ascending dotted or dashed path crossing the strip left to right with four stations:

1. Two/three completed nodes filled emerald with soft glows (past lessons done).
2. One current node filled indigo, slightly larger, with a soft halo (where the learner is now).
3. One locked node drawn as slate outline (the challenge ahead).
4. A slim amber star or radiant sliver at the far right horizon, half-emerging from the edge as reward.

Background: near-empty slate sky; the faint silhouette of the same school building from Slot 1 may anchor the far-left baseline to keep the family resemblance.

**Key rule:** clear upward drift (right side visually higher) -- progress must be felt at a glance even at 300 px wide.

---

## Consistency checklist before you commit files

1. Same illustration style, same linework weight, same light angle across all four.
2. Palette passes review against the table above; no stray hues.
3. No text anywhere. No UI chrome. No logos.
4. Compare each against its background: place the image on a `#0F172A` swatch -- edges should melt into the canvas, not print a white halo.
5. Faces simplified or turned; uniforms plausible for Grades 10-12 in the Eastern Cape.
6. File names exactly as specified, in `public/images/`, under 250 KB.

## Installing the files

Overwriting the placeholder files with the same names (`offline-sync.png`, `connectivity.png`, `secure-device.png`, `learning-path.png`) requires no build change. If you produce PNG or WebP instead, either keep the name and update the one `src` string inside the matching component in `src/components/illustrations/`, or ask for the swap. Alt text lives with each component and should be updated only if the scene interpretation changes.
