import {
  AbsoluteFill,
  Video,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { colors, fonts, neonGlow } from "../shared/brand.js";
import { idleFloat } from "../shared/animations.js";

// --- Text block timing (frames at 30fps) ---
// Offset: 45 frames — text starts 5 frames before speed change (50)
// Block 1: 45–125
// Block 2: 105–175
// Block 3: 165–235
// Block 4: 225–420

const BLOCK_TIMINGS = [
  { in: 45,  out: 125 },
  { in: 105, out: 175 },
  { in: 165, out: 235 },
  { in: 225, out: 420 },
];

const FADE_DURATION = 18; // frames

// Block opacity: fade in, hold, fade out
function blockOpacity(frame, { in: inF, out: outF }) {
  return interpolate(
    frame,
    [inF, inF + FADE_DURATION, outF - FADE_DURATION, outF],
    [0,   1,                   1,                    0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

// Spring slide-up entrance
function blockSlide(frame, startFrame, fps) {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 100, damping: 14, mass: 1 },
  });
  return interpolate(progress, [0, 1], [36, 0]);
}

// Pulsing glow — sine wave on text-shadow spread
function pulsingGlow(frame, fps, color) {
  const t = frame / fps;
  const pulse = Math.sin(t * Math.PI * 1.4) * 0.5 + 0.5; // 0–1
  const spread = interpolate(pulse, [0, 1], [8, 28]);
  return `0 0 ${spread}px ${color}, 0 0 ${spread * 2}px ${color}80`;
}

// --- TextBlock component ---
const TextBlock = ({ frame, fps, timing, children, style = {} }) => {
  const opacity = blockOpacity(frame, timing);
  const translateY = blockSlide(frame, timing.in, fps);

  return (
    <div style={{
      opacity,
      transform: `translateY(${translateY}px)`,
      position: "absolute",
      ...style,
    }}>
      {children}
    </div>
  );
};

// --- TextOverlay component ---
export const TextOverlay = ({ frame, fps }) => {
  const ctaGlow = pulsingGlow(frame, fps, colors.neonRight);
  const heroGlow = `0 0 30px ${colors.heroGlow}80`;

  const baseText = {
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 800,
    color: colors.textPrimary,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  };

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      padding: "0 64px",
    }}>
      {/* Block 1 — launch announcement */}
      <TextBlock frame={frame} fps={fps} timing={BLOCK_TIMINGS[0]} style={{ left: 64, right: 64, textAlign: "center" }}>
        <div style={{
          ...baseText,
          fontSize: 80,
          textShadow: heroGlow,
          textAlign: "center",
        }}>
          We just launched.{"\n"}
          <span style={{ color: colors.heroGlow }}>
            Pocket AI Content Creator
          </span>{" "}
          is live.
        </div>
      </TextBlock>

      {/* Block 2 — transformation */}
      <TextBlock frame={frame} fps={fps} timing={BLOCK_TIMINGS[1]} style={{ left: 64, right: 64, textAlign: "center" }}>
        <div style={{
          ...baseText,
          fontSize: 66,
          color: colors.textSecondary,
          textShadow: `0 0 20px ${colors.neonLeft}60`,
          textAlign: "center",
        }}>
          From{" "}
          <span style={{ color: colors.textPrimary, fontStyle: "italic" }}>
            'watching tutorials'
          </span>
          {"\n"}to{" "}
          <span style={{ color: colors.textPrimary, fontStyle: "italic" }}>
            'building your first digital asset.'
          </span>
        </div>
      </TextBlock>

      {/* Block 3 — no barriers */}
      <TextBlock frame={frame} fps={fps} timing={BLOCK_TIMINGS[2]} style={{ left: 64, right: 64, textAlign: "center" }}>
        <div style={{
          ...baseText,
          fontSize: 76,
          textShadow: `0 0 30px ${colors.neonRight}60`,
          textAlign: "center",
        }}>
          No coding.{"\n"}No tech background required.
        </div>
      </TextBlock>

      {/* Block 4 — CTA with glassmorphism */}
      <TextBlock frame={frame} fps={fps} timing={BLOCK_TIMINGS[3]} style={{ left: 64, right: 64 }}>
        <div style={{
          background: "rgba(5, 8, 16, 0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${colors.neonRight}30`,
          borderRadius: 24,
          padding: "36px 44px",
          textAlign: "center",
        }}>
          <div style={{
            ...baseText,
            fontSize: 58,
            marginBottom: 20,
          }}>
            Build something.
          </div>
          <div style={{
            fontFamily: baseText.fontFamily,
            fontWeight: 700,
            fontSize: 36,
            color: colors.neonRight,
            textShadow: ctaGlow,
            letterSpacing: "0.01em",
          }}>
            Join at skool.com/pocket-ai-hustle-8584
          </div>
        </div>
      </TextBlock>
    </AbsoluteFill>
  );
};

// --- Video speed ---
// Before frame 84: 5x playbackRate
// After frame 84:  0.1x playbackRate
// Two separate <Video> instances, each starting at the right offset
const SPEED_CHANGE_FRAME = 50;
const FAST_RATE = 2.0;
const SLOW_RATE = 0.5;
const VIDEO_FRAMES = 240; // 8s × 30fps
const CROSSFADE_FRAMES = 5;

// --- Main Day1Launch composition ---
export const Day1Launch = ({ video }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftFloat = idleFloat(frame, fps, 6, 4);
  const rightFloat = idleFloat(frame, fps, 6, 3.5);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>

      {/* Background video — fast, fades out over crossfade window */}
      {video && (
        <Sequence from={0} durationInFrames={SPEED_CHANGE_FRAME + CROSSFADE_FRAMES}>
          <Video
            src={staticFile(`videos/${video}`)}
            playbackRate={FAST_RATE}
            loop
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              opacity: interpolate(
                frame,
                [SPEED_CHANGE_FRAME, SPEED_CHANGE_FRAME + CROSSFADE_FRAMES],
                [0.8, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          />
        </Sequence>
      )}

      {/* Background video — slow, fades in over crossfade window */}
      {video && (
        <Sequence from={SPEED_CHANGE_FRAME - CROSSFADE_FRAMES}>
          <Video
            src={staticFile(`videos/${video}`)}
            playbackRate={SLOW_RATE}
            startFrom={Math.round(SPEED_CHANGE_FRAME * FAST_RATE) % VIDEO_FRAMES}
            loop
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              opacity: interpolate(
                frame,
                [SPEED_CHANGE_FRAME - CROSSFADE_FRAMES, SPEED_CHANGE_FRAME],
                [0, 0.8],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          />
        </Sequence>
      )}

      {/* Left magenta neon bar */}
      <div style={{
        position: "absolute",
        left: 0,
        top: `calc(10% + ${leftFloat}px)`,
        width: 6,
        height: "80%",
        background: `linear-gradient(to bottom, transparent, ${colors.neonLeft}, transparent)`,
        boxShadow: neonGlow(colors.neonLeft, 30),
        borderRadius: 3,
      }} />

      {/* Right cyan neon bar */}
      <div style={{
        position: "absolute",
        right: 0,
        top: `calc(15% + ${rightFloat}px)`,
        width: 6,
        height: "70%",
        background: `linear-gradient(to bottom, transparent, ${colors.neonRight}, transparent)`,
        boxShadow: neonGlow(colors.neonRight, 30),
        borderRadius: 3,
      }} />

      {/* Glass overlay — fades in at speed change */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(10, 14, 30, 0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: interpolate(
          frame,
          [SPEED_CHANGE_FRAME - CROSSFADE_FRAMES - 5, SPEED_CHANGE_FRAME + CROSSFADE_FRAMES - 5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        ),
      }} />

      {/* Sequenced text overlay */}
      <TextOverlay frame={frame} fps={fps} />

    </AbsoluteFill>
  );
};
