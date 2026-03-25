import { interpolate, spring } from "remotion";

// Fade in from 0 to 1 over `durationFrames` starting at `startFrame`
export const fadeIn = (frame, startFrame, durationFrames = 15) =>
  interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Slide up (translateY) from offset px to 0
export const slideUp = (frame, startFrame, fps, offsetPx = 40) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  return interpolate(progress, [0, 1], [offsetPx, 0]);
};

// Slow idle float — sine wave oscillation
export const idleFloat = (frame, fps, amplitude = 8, periodSeconds = 3) => {
  const t = frame / fps;
  return Math.sin((t * 2 * Math.PI) / periodSeconds) * amplitude;
};

// Scale pop in
export const popIn = (frame, startFrame, fps) =>
  spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.8 },
    from: 0,
    to: 1,
  });
