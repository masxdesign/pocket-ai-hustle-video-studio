# Pocket AI Hustle — Video Studio

Remotion-based video production workspace. Self-contained — open this folder in terminal to work on videos.

## Setup

```bash
cd artifacts/video-studio
npm install
npm run dev       # opens Remotion Studio in browser
```

## Adding a new Veo 3 video

1. Drop the mp4 into `public/videos/`
2. Reference it by filename in the relevant data file (e.g. `src/data/launch-posts.js`)

## Render a single video

```bash
npx remotion render LaunchDay1 out/day1.mp4
```

## Render all 7 launch posts

```bash
for i in 1 2 3 4 5 6 7; do
  npx remotion render LaunchDay$i out/day$i.mp4
done
```

## Output sizes

- Portrait 1080×1920 @ 30fps — Reels / TikTok
- To switch to landscape (YouTube/Twitter), change WIDTH/HEIGHT in `src/Root.jsx`

## Adding a new composition type

1. Create a new component in `src/compositions/`
2. Create a data file in `src/data/`
3. Register it in `src/Root.jsx`

## Brand reference

All colors, fonts, and neon values live in `src/shared/brand.js`.
All animation helpers live in `src/shared/animations.js`.
