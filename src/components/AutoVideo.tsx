import { useEffect, useRef, useState } from "react";

interface AutoVideoProps {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  audio?: boolean;
}

export default function AutoVideo({
  src,
  poster,
  alt,
  className,
  audio = false,
}: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || audio || reduceMotion || failed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.play().catch(() => undefined);
        } else {
          element.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [audio, reduceMotion, failed]);

  if (failed || (reduceMotion && !audio)) {
    if (poster) {
      return <img src={poster} alt={alt ?? ""} className={className} />;
    }
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      muted={!audio}
      loop={!audio}
      controls={audio}
      playsInline
      preload="metadata"
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
      onError={() => setFailed(true)}
    />
  );
}