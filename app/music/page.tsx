import type { Metadata } from "next";
import Image from "next/image";
import { LIVE_TRACK, FOCUS_SINGLE, PERFORMANCES } from "../data/content";
import AudioPlayer from "../components/AudioPlayer";
import ComingSoonLink from "../components/ComingSoonLink";
import ProfileHero from "../components/ProfileHero";

export const metadata: Metadata = {
  title: "Music — GrassTunes",
  description: "Listen to GrassTunes: live recordings, the focus single, and performance history.",
};

export default function MusicPage() {
  return (
    <>
      <ProfileHero />
      <div className="page">
        <section className="section">
          <h2 className="section-title">Live Performances</h2>
          <AudioPlayer title={LIVE_TRACK.title} artist={LIVE_TRACK.artist} src={LIVE_TRACK.src} />
        </section>

        <section className="section">
          <h2 className="section-title">Focus Single</h2>
          <div className="single-card">
            <Image
              src={FOCUS_SINGLE.cover}
              alt={`${FOCUS_SINGLE.title} — GrassTunes`}
              width={220}
              height={220}
              className="single-cover"
            />
            <div className="single-info">
              <span className="single-tag">{FOCUS_SINGLE.label}</span>
              <h3 className="single-title">{FOCUS_SINGLE.title}</h3>
              <p className="single-artist">GrassTunes</p>
              <ComingSoonLink title="Streaming links coming soon">Listen on streaming</ComingSoonLink>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Live History</h2>
          <ul className="performance-list">
            {PERFORMANCES.map((show) => (
              <li key={show.venue} className="performance-item">
                <span className="performance-venue">{show.venue}</span>
                <span className="performance-year">{show.year}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
