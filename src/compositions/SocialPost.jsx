import { AbsoluteFill, Video, useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import { colors, fonts, neonGlow } from "../shared/brand.js";
import { fadeIn, slideUp, idleFloat } from "../shared/animations.js";

export const SocialPost = ({ video, headline, body, cta }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Text animation timing
  const headlineOpacity = fadeIn(frame, 20, 20);
  const headlineY = slideUp(frame, 20, fps, 30);

  const bodyOpacity = fadeIn(frame, 45, 20);
  const bodyY = slideUp(frame, 45, fps, 20);

  const ctaOpacity = fadeIn(frame, 70, 20);

  // Neon bar float
  const leftFloat = idleFloat(frame, fps, 6, 4);
  const rightFloat = idleFloat(frame, fps, 6, 3.5);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>

      {/* Veo 3 background video */}
      {video && (
        <Video
          src={staticFile(`videos/${video}`)}
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
        />
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

      {/* Dark gradient overlay — bottom half for text legibility */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(5,8,16,0.92) 40%, rgba(5,8,16,0.2) 100%)",
      }} />

      {/* Text content */}
      <AbsoluteFill style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: "0 60px 80px 60px",
        flexDirection: "column",
        gap: 0,
      }}>

        {/* Headline */}
        <div style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontFamily: fonts.heading,
          fontSize: fonts.sizeHeading,
          fontWeight: fonts.weightHeading,
          color: colors.textPrimary,
          lineHeight: 1.15,
          marginBottom: 24,
          whiteSpace: "pre-line",
          textShadow: `0 0 40px ${colors.heroGlow}60`,
        }}>
          {headline}
        </div>

        {/* Body */}
        <div style={{
          opacity: bodyOpacity,
          transform: `translateY(${bodyY}px)`,
          fontFamily: fonts.body,
          fontSize: fonts.sizeBody,
          fontWeight: 400,
          color: colors.textSecondary,
          lineHeight: 1.6,
          marginBottom: 32,
          whiteSpace: "pre-line",
        }}>
          {body}
        </div>

        {/* CTA */}
        <div style={{
          opacity: ctaOpacity,
          fontFamily: fonts.body,
          fontSize: fonts.sizeCaption,
          fontWeight: 600,
          color: colors.neonRight,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          textShadow: neonGlow(colors.neonRight, 10),
        }}>
          {cta}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
