import VideoSpotlightPlayer from "./VideoSpotlightPlayer";

export default function VideoSpotlight() {
  const embedUrl = process.env.NEXT_PUBLIC_LOOM_EMBED_URL?.trim();
  const localVideoSrc = process.env.NEXT_PUBLIC_HOW_WE_WORK_VIDEO?.trim();

  const hasLoom = Boolean(embedUrl);
  const hasLocalVideo = Boolean(localVideoSrc);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            How we work
          </h2>
          <p className="text-lg text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            A quick look at how we take your project from first call to launch.
          </p>
        </div>

        {hasLocalVideo && localVideoSrc ? (
          <VideoSpotlightPlayer src={localVideoSrc} />
        ) : hasLoom && embedUrl ? (
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl aspect-video bg-black">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title="Flowforge — how we work (video)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 aspect-video flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary" aria-hidden>
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7L8 5zm2 2.5L15.2 12 10 16.5V7.5z" />
              </svg>
            </div>
            <div className="text-text-light dark:text-gray-400 max-w-lg text-sm sm:text-base space-y-3">
              <p>
                <strong className="text-text dark:text-gray-200">Option A — your own file (e.g. from Artlist):</strong>
              </p>
              <ol className="text-left list-decimal pl-5 space-y-1.5">
                <li>
                  Copy your exported MP4 into the project (must not be 0 bytes), e.g.{" "}
                  <code className="text-xs bg-white dark:bg-gray-900 px-1 py-0.5 rounded">
                    public/videos/video.mp4
                  </code>
                </li>
                <li>
                  In <code className="text-xs bg-white dark:bg-gray-900 px-1 py-0.5 rounded">.env.local</code> add:{" "}
                  <code className="text-xs bg-white dark:bg-gray-900 px-1 py-0.5 rounded break-all">
                    NEXT_PUBLIC_HOW_WE_WORK_VIDEO=/videos/video.mp4
                  </code>
                </li>
                <li>Restart <code className="text-xs">npm run dev</code> so Next.js picks up the env var.</li>
              </ol>
              <p className="pt-2">
                <strong className="text-text dark:text-gray-200">Option B — Loom:</strong> set{" "}
                <code className="text-xs bg-white dark:bg-gray-900 px-1 py-0.5 rounded break-all">
                  NEXT_PUBLIC_LOOM_EMBED_URL
                </code>{" "}
                to your embed URL.
              </p>
            </div>
            <a href="#contact" className="text-primary font-semibold hover:underline">
              Book a call instead
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
