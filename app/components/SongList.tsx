"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Song } from "../data/content";
import AudioPlayer, { type AudioPlayerHandle } from "./AudioPlayer";

export default function SongList({
  songs,
  showList = true,
}: {
  songs: Song[];
  showList?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSelected, setHasSelected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<AudioPlayerHandle>(null);

  const current = songs[currentIndex];

  const selectSong = (index: number) => {
    if (index === currentIndex) {
      playerRef.current?.togglePlay();
      return;
    }
    setHasSelected(true);
    setCurrentIndex(index);
  };

  const goNext = () => {
    setHasSelected(true);
    setCurrentIndex((i) => (i + 1) % songs.length);
  };

  const goPrev = () => {
    setHasSelected(true);
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
  };

  return (
    <div className="song-list-wrap">
      <AudioPlayer
        key={current.src}
        ref={playerRef}
        title={current.title}
        artist={current.artist}
        src={current.src}
        autoPlay={hasSelected}
        onEnded={goNext}
        onNext={goNext}
        onPrev={goPrev}
        onPlayStateChange={setIsPlaying}
      />

      {showList && (
      <ul className="song-list">
        {songs.map((song, i) => {
          const active = i === currentIndex;
          const activePlaying = active && isPlaying;
          return (
            <li key={song.src}>
              <button
                type="button"
                className={`song-row${active ? " active" : ""}`}
                onClick={() => selectSong(i)}
                aria-current={active ? "true" : undefined}
                aria-label={
                  active
                    ? activePlaying
                      ? `Pause ${song.title}`
                      : `Play ${song.title}`
                    : `Play ${song.title}`
                }
              >
                <span className="song-row-index">
                  {activePlaying ? (
                    <span className="song-row-eq" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : active ? (
                    <svg className="song-row-play song-row-play-active" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  ) : (
                    <>
                      <span className="song-row-number">{i + 1}</span>
                      <svg className="song-row-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </>
                  )}
                </span>
                <Image
                  src={song.cover}
                  alt=""
                  width={40}
                  height={40}
                  className="song-row-cover"
                />
                <span className="song-row-meta">
                  <span className="song-row-title">{song.title}</span>
                  <span className="song-row-artist">{song.artist}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      )}
    </div>
  );
}
