// Pocket AI Hustle — Brand System
// Derived from the image-prompt-agent visual style

export const colors = {
  // Studio background
  background: "#050810",       // dark deep navy-black

  // Neon lighting (fixed positions per brand)
  neonLeft: "#FF0090",         // hot magenta — always left
  neonRight: "#00E5CC",        // cyan/teal — always right

  // Hero object glow
  heroGlow: "#FFA830",         // warm orange-gold emissive
  heroGlowSoft: "#FF8C00",     // slightly deeper for gradients

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.7)",

  // Particles / floating elements
  particle: "rgba(255, 168, 48, 0.6)",   // orange-gold particles
  particleCyan: "rgba(0, 229, 204, 0.4)",
};

export const fonts = {
  // System safe — swap for custom font via @remotion/google-fonts if needed
  heading: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  body: "'Inter', 'Helvetica Neue', Arial, sans-serif",

  // Sizes (in px, for 1080x1920 portrait or 1920x1080 landscape)
  sizeHeading: 72,
  sizeBody: 36,
  sizeCaption: 24,

  weightHeading: 800,
  weightBody: 400,
};

export const timing = {
  // Frame counts at 30fps
  textFadeIn: 15,       // 0.5s
  textHoldStart: 30,    // 1s
  particlePulse: 60,    // 2s cycle
};

export const neonGlow = (color, spread = 40) =>
  `0 0 ${spread}px ${color}, 0 0 ${spread * 2}px ${color}40`;
