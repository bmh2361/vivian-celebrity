# Portfolio imagery

The page reads `public/portfolio/index.json` in its written order. It does not scan numbered files. Keep the first four entries focused on strong portraits: these lead the desktop columns, and the first two lead mobile.

## Add a work

1. Place an image in the public website resources. Use work already approved for public display; a file in an internal audit or a draft case is not eligible.
2. Add one entry to the manifest at the intended position. Use a unique `id`, a root-relative `src`, the original `width` and `height`, and descriptive `alt.zh` / `alt.en` text. Do not infer people's identities.
3. Optionally add smaller, unaltered WebP versions in `public/portfolio/previews/`. Set `previews` to an array of `{ "src": "/portfolio/previews/example-320.webp", "width": 320 }` entries, with another at 640px if the source supports it. Set `detail` to a larger version, up to 1600px wide. Never upscale a smaller source. If these fields are absent, the original is used.
4. Run `npm run build`, then check the page at desktop and mobile widths, including the enlarged image. Confirm the new work's proportions and face are intact.

Example without optional previews:

```json
{
  "id": "new-work",
  "src": "/portfolio/new-work.jpg",
  "width": 1200,
  "height": 1600,
  "alt": {
    "zh": "自然光下的黑色服装人像",
    "en": "A portrait in black in natural light"
  }
}
```

The page distributes the ordered list across four desktop, three tablet or two mobile columns. Images keep their natural proportions. Each work appears once in the manifest; the duplicate group exists only to close the animation loop. No JSX edit is needed when adding a work.

## Interaction and motion

- The motion control pauses or resumes the wall. Mouse hover slows only its column to a stop, then resumes from the same position.
- A click or tap opens a full-frame image. Use Previous / Next, arrow keys, Escape, Close, or the background. Keyboard focus stays inside the dialog and returns to the triggering work for keyboard users.
- Keyboard users can open the leading work in each moving column and browse every work with the dialog controls. Reduced-motion mode exposes all works in a static gallery without duplicate buttons.
- System reduced-motion changes apply live. Hidden tabs and the open lightbox pause the wall.
- Column heights and animation distances are separate. A ResizeObserver measures the complete group including its final gap, so image loading and resizing do not introduce a loop gap.
- Each moving column checks the animation clock every 750ms and loads previews within 400px of its window. Image positions are cached only when ResizeObserver runs; the loading timer does not read layout or update React state. This also works in browsers where compositor-driven movement does not trigger native lazy loading or intersection updates.

The original source images are retained. Optimised previews are derivatives, not additional works. Do not put source archives, extraction folders or audit reports in `public`.
