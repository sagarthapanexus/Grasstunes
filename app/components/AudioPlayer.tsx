"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface AudioPlayerHandle {
  togglePlay: () => void;
}

const EQ_BARS = [
  { duration: "0.4s", maxHeight: "10px" },
  { duration: "0.6s", maxHeight: "18px" },
  { duration: "0.3s", maxHeight: "14px" },
  { duration: "0.5s", maxHeight: "8px" },
  { duration: "0.7s", maxHeight: "16px" },
];

function formatTime(secs: number): string {
  if (isNaN(secs) || !isFinite(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const AudioPlayer = forwardRef<AudioPlayerHandle, {
  title: string;
  artist: string;
  src: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}>(function AudioPlayer(
  { title, artist, src, autoPlay = false, onEnded, onNext, onPrev, onPlayStateChange },
  ref
) {
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
    if (!isPlaying) return;

    const tick = () => {
      const audio = audioRef.current;
      if (audio && !isSeeking) {
        setCurrentTime(audio.currentTime);
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, isSeeking]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  useImperativeHandle(ref, () => ({ togglePlay }));

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    if (autoPlay) {
      audioRef.current?.play().catch(() => {});
    }
    // Only run on mount — this component is remounted (via `key`) per track.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };
  const handlePlay = () => {
    setIsPlaying(true);
    onPlayStateChange?.(true);
  };
  const handlePause = () => {
    setIsPlaying(false);
    onPlayStateChange?.(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

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
    <div className="audio-player" aria-label="Music player">
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={handlePlay}
        onPause={handlePause}
        preload="metadata"
      />

      <div className="track-info">
        <div className="track-disc" aria-hidden="true">
          <div className={`disc-inner${isPlaying ? " spinning" : ""}`}>
            <div className="disc-hole" />
          </div>
        </div>
        <div className="track-meta">
          <p className="track-title">{title}</p>
          <p className="track-artist">{artist}</p>
        </div>
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
      </div>

      <div className="player-controls">
        {onPrev && (
          <button className="skip-btn" onClick={onPrev} aria-label="Previous track">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>
        )}

        <button
          className={`play-btn${isPlaying ? " playing" : ""}`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        {onNext && (
          <button className="skip-btn" onClick={onNext} aria-label="Next track">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" />
            </svg>
          </button>
        )}

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
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            <div className="progress-thumb" style={{ left: `${progress}%` }} />
          </div>
          <span className="time-label">{formatTime(duration)}</span>
        </div>

        <div className="volume-area">
          <button
            className="vol-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
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
            style={{ "--vol-pct": `${(isMuted ? 0 : volume) * 100}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
});

export default AudioPlayer;
