"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  src: string;
};

export default function VideoSpotlightPlayer({ src }: Props) {
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      v.muted = false;
      v.volume = 1;
      void v.play().catch(() => {
        /* Some browsers block unmuted autoplay until user interaction */
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

  if (error) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/30 aspect-video flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm text-text dark:text-gray-200 font-medium">Video could not load</p>
        <p className="text-xs text-text-light dark:text-gray-400 max-w-md">{error}</p>
        <p className="text-xs text-text-light dark:text-gray-500">
          Expected file: <code className="bg-white/80 dark:bg-gray-900 px-1 rounded">public{src}</code>
        </p>
        <a href="#contact" className="text-primary font-semibold text-sm hover:underline">
          Book a call instead
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl aspect-video bg-black [&_video::-webkit-media-controls]:hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        playsInline
        loop
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        title="Flowforge — how we work (video)"
        onError={() => {
          setError(
            "The file may be empty (0 bytes), corrupted, or not a supported format. Re-export from Artlist as MP4 (H.264) and replace public/videos/video.mp4, then hard-refresh."
          );
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
