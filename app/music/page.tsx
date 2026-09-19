import type { Metadata } from "next";
import { PERFORMANCES, SONGS } from "../data/content";
import SongList from "../components/SongList";
import ProfileHero from "../components/ProfileHero";

export const metadata: Metadata = {
  title: "Music — GrassTunes",
  description: "Listen to GrassTunes: songs and performance history.",
};

export default function MusicPage() {
  return (
    <>
      <ProfileHero />
      <div className="page">
        <section className="section">
          <h2 className="section-title">Songs</h2>
          <SongList songs={SONGS} />
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
