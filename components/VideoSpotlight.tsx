import VideoSpotlightPlayer from "./VideoSpotlightPlayer";

export default function VideoSpotlight() {
  const embedUrl = process.env.NEXT_PUBLIC_LOOM_EMBED_URL?.trim();
  const localVideoSrc = process.env.NEXT_PUBLIC_HOW_WE_WORK_VIDEO?.trim();

  const hasLoom = Boolean(embedUrl);
  const hasLocalVideo = Boolean(localVideoSrc);

  // No configured source → render nothing. Developer setup notes never reach visitors.
  if (!hasLoom && !hasLocalVideo) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-ink">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-title mb-4">
            How we work
          </h2>
          <p className="text-lg text-text-light dark:text-steel-dark max-w-2xl mx-auto">
            A quick look at how we take your project from first call to launch.
          </p>
        </div>

        {hasLocalVideo && localVideoSrc ? (
          <VideoSpotlightPlayer src={localVideoSrc} />
        ) : hasLoom && embedUrl ? (
          <div className="relative rounded-2xl overflow-hidden border border-line dark:border-line-dark shadow-xl aspect-video bg-black">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title="Flowforge — how we work (video)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
