import { Composition } from "remotion";
import { SocialPost } from "./compositions/SocialPost.jsx";
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
      {launchPosts.map((post) => (
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
