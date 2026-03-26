import { Composition } from "remotion";
import { SocialPost } from "./compositions/SocialPost.jsx";
import { Day1Launch } from "./compositions/Day1Launch.jsx";
import { launchPosts } from "./data/launch-posts.js";

// Video settings
const FPS = 30;
const DURATION_SECONDS = 7;
const DURATION_FRAMES = FPS * DURATION_SECONDS;

// Portrait (Reels/TikTok)
const WIDTH = 1080;
const HEIGHT = 1920;

export const RemotionRoot = () => {
  return (
    <>
      {/* Day 1 — dedicated composition with sequenced TextOverlay */}
      <Composition
        id="LaunchDay1"
        component={Day1Launch}
        durationInFrames={FPS * 10}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ video: "day1-launch.mp4" }}
      />

      {/* Days 2–7 — generic SocialPost template */}
      {launchPosts.filter((p) => p.day !== 1).map((post) => (
        <Composition
          key={`launch-day-${post.day}`}
          id={`LaunchDay${post.day}`}
          component={SocialPost}
          durationInFrames={DURATION_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{
            video: post.video,
            headline: post.headline,
            body: post.body,
            cta: post.cta,
          }}
        />
      ))}
    </>
  );
};
