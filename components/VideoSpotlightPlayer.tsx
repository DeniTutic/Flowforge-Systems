"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  src: string;
};

export default function VideoSpotlightPlayer({ src }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video || error) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tryPlay = () => {
      const v = videoRef.current;
      if (!v) return;
      void v.play().catch(() => {
        /* Some browsers block autoplay until user interaction */
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const v = videoRef.current;
        if (!entry || !v) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          if (v.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            tryPlay();
          } else {
            const onReady = () => {
              tryPlay();
              v.removeEventListener("canplay", onReady);
            };
            v.addEventListener("canplay", onReady, { once: true });
          }
        } else {
          v.pause();
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [error, src]);

  // If the clip fails to load, show nothing rather than a broken frame or setup notes.
  if (error) return null;

  return (
    <button
      type="button"
      ref={containerRef}
      onClick={() => setMuted((m) => !m)}
      aria-label={muted ? "Unmute video" : "Mute video"}
      className="group relative block w-full p-0 appearance-none text-left rounded-2xl overflow-hidden border border-line dark:border-line-dark shadow-xl aspect-video bg-black cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink [&_video::-webkit-media-controls]:hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted={muted}
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        title="Flowforge — how we work (video)"
        onError={() => setError("unavailable")}
      >
        <source src={src} type="video/mp4" />
      </video>

      <span className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
        {muted ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9l4 6m0-6l-4 6" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
