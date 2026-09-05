"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const PARTICLES = [
  { left: "8%",  size: "8px",  color: "#a8e63d", glow: "16px", speed: "9s",  delay: "0s",   drift: "30px"  },
  { left: "18%", size: "6px",  color: "#6b5ce7", glow: "12px", speed: "12s", delay: "2s",   drift: "-20px" },
  { left: "28%", size: "10px", color: "#b8ff3e", glow: "20px", speed: "8s",  delay: "4s",   drift: "15px"  },
  { left: "38%", size: "6px",  color: "#a8e63d", glow: "12px", speed: "14s", delay: "1s",   drift: "-35px" },
  { left: "48%", size: "12px", color: "#6b5ce7", glow: "24px", speed: "10s", delay: "3s",   drift: "25px"  },
  { left: "58%", size: "6px",  color: "#b8ff3e", glow: "12px", speed: "11s", delay: "5s",   drift: "-15px" },
  { left: "68%", size: "8px",  color: "#a8e63d", glow: "16px", speed: "9s",  delay: "0.5s", drift: "40px"  },
  { left: "78%", size: "10px", color: "#6b5ce7", glow: "20px", speed: "13s", delay: "2.5s", drift: "-25px" },
  { left: "88%", size: "6px",  color: "#b8ff3e", glow: "12px", speed: "7s",  delay: "4.5s", drift: "20px"  },
  { left: "93%", size: "8px",  color: "#a8e63d", glow: "16px", speed: "11s", delay: "1.5s", drift: "-30px" },
];

const EQ_BARS = [
  { duration: "0.4s", maxHeight: "10px" },
  { duration: "0.6s", maxHeight: "18px" },
  { duration: "0.3s", maxHeight: "14px" },
  { duration: "0.5s", maxHeight: "8px"  },
  { duration: "0.7s", maxHeight: "16px" },
];

const SOCIAL_LINKS = [
  {
    key: "facebook",
    href: "https://www.facebook.com/Grasstunes",
    label: "Facebook",
    className: "social-facebook",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: "tiktok",
    href: "https://www.tiktok.com/@grasstunes_",
    label: "TikTok",
    className: "social-tiktok",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    href: "https://www.youtube.com/Grasstunes",
    label: "YouTube",
    className: "social-youtube",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/grasstunes_/",
    label: "Instagram",
    className: "social-instagram",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

function formatTime(secs: number): string {
  if (isNaN(secs) || !isFinite(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Home() {
  const [logoFloating, setLogoFloating] = useState(false);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setLogoFloating(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Smooth time update via requestAnimationFrame
  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !isSeeking) {
      setCurrentTime(audio.currentTime);
    }
    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, [isSeeking]);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, updateProgress]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => setIsPlaying(false);
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // Click on progress bar to seek
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  // Drag on progress bar
  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true);
    handleProgressClick(e);

    const onMove = (ev: MouseEvent) => {
      const bar = progressRef.current;
      const audio = audioRef.current;
      if (!bar || !audio || !duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      setCurrentTime(ratio * duration);
      audio.currentTime = ratio * duration;
    };
    const onUp = () => {
      setIsSeeking(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.volume = val;
    setVolume(val);
    setIsMuted(val === 0);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <main className="landing-page">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/Timi Jastai Ma  Grasstunes  Live in Ramsterdam.mp3"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={handlePlay}
        onPause={handlePause}
        preload="metadata"
      />

      {/* Background glows */}
      <div className="bg-glow-green" aria-hidden="true" />
      <div className="bg-glow-purple" aria-hidden="true" />

      {/* Scanlines */}
      <div className="scanline" aria-hidden="true" />

      {/* Particles */}
      <div className="particles-container" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              "--left": p.left,
              "--size": p.size,
              "--color": p.color,
              "--glow": p.glow,
              "--speed": p.speed,
              "--delay": p.delay,
              "--drift": p.drift,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="content-wrapper">
        {/* Logo */}
        <div
          className={`logo-container${logoFloating ? " floating" : ""}`}
          aria-label="Grasstunes logo"
        >
          <div className="logo-ring" aria-hidden="true" />
          <div className="logo-ring" aria-hidden="true" />
          <div className="logo-ring" aria-hidden="true" />
          <Image
            src="/grasstunes-logo.jpeg"
            alt="Grasstunes — Music Band"
            width={520}
            height={0}
            className="logo-image"
            priority
            style={{ height: "auto" }}
          />
        </div>

        {/* Soundcheck text */}
        <div className="soundcheck-wrapper" role="status" aria-live="polite">
          <div className="eq-bars" aria-hidden="true">
            {EQ_BARS.map((bar, i) => (
              <div
                key={i}
                className={`eq-bar${isPlaying ? " playing" : ""}`}
                style={{
                  "--duration": bar.duration,
                  "--max-height": bar.maxHeight,
                } as React.CSSProperties}
              />
            ))}
          </div>
          <span className="soundcheck-text">Soundcheck in progress</span>
          <span className="cursor" aria-hidden="true" />
        </div>

        {/* ====== AUDIO PLAYER ====== */}
        <div className="audio-player" aria-label="Music player">
          {/* Track info */}
          <div className="track-info">
            <div className="track-disc" aria-hidden="true">
              <div className={`disc-inner${isPlaying ? " spinning" : ""}`}>
                <div className="disc-hole" />
              </div>
            </div>
            <div className="track-meta">
              <p className="track-title">Timi Jastai Ma</p>
              <p className="track-artist">Grasstunes · Live in Ramsterdam</p>
            </div>
          </div>

          {/* Controls row */}
          <div className="player-controls">
            {/* Play / Pause button */}
            <button
              className={`play-btn${isPlaying ? " playing" : ""}`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              id="audio-play-btn"
            >
              {isPlaying ? (
                /* Pause icon */
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Play icon */
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </button>

            {/* Progress & time */}
            <div className="progress-area">
              <span className="time-label">{formatTime(currentTime)}</span>
              <div
                className="progress-bar-track"
                ref={progressRef}
                onClick={handleProgressClick}
                onMouseDown={handleProgressMouseDown}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                tabIndex={0}
              >
                <div className="progress-bar-bg" />
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="progress-thumb"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <span className="time-label">{formatTime(duration)}</span>
            </div>

            {/* Volume */}
            <div className="volume-area">
              <button
                className="vol-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                id="audio-mute-btn"
              >
                {isMuted || volume === 0 ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.73 2.5-2.25 2.5-4.03zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                className="volume-slider"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                id="audio-volume-slider"
                style={{ "--vol-pct": `${(isMuted ? 0 : volume) * 100}%` } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line" aria-hidden="true" />

        {/* Social icons */}
        <nav className="social-container" aria-label="Social media links">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link ${social.className}`}
              aria-label={`Follow Grasstunes on ${social.label}`}
              id={`social-${social.key}`}
            >
              {social.svg}
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
