import Link from "next/link";
import Image from "next/image";
import {
  BAND,
  MEMBERS,
  LIVE_TRACK,
  FOCUS_SINGLE,
  PERFORMANCES,
  VIDEOS,
  YOUTUBE_CHANNEL_URL,
} from "./data/content";
import SocialLinks from "./components/SocialLinks";
import BioText from "./components/BioText";
import MembersSection from "./components/MembersSection";
import ProfileHero from "./components/ProfileHero";
import VideoLightbox from "./components/VideoLightbox";

export default function Home() {
  const bio = `${BAND.bio} ${BAND.bioExtended}`;

  return (
    <>
      <ProfileHero />

      {/* ===== About ===== */}
      <section className="section about-section">
        <div className="about-grid">
          <div className="about-bio-col">
            <h2 className="section-title">About</h2>
            <BioText text={bio} />
          </div>
          <div className="about-facts-col">
            <dl className="fact-list">
              <div className="fact-row">
                <dt>Location</dt>
                <dd>{BAND.location}</dd>
              </div>
              <div className="fact-row">
                <dt>Active</dt>
                <dd>{BAND.formedYear} – Present</dd>
              </div>
              <div className="fact-row">
                <dt>Genres</dt>
                <dd>{BAND.genres.join(", ")}</dd>
              </div>
            </dl>
            <SocialLinks colored />
          </div>
        </div>
      </section>

      {/* ===== Members ===== */}
      <section className="section">
        <h2 className="section-title">Members</h2>
        <MembersSection members={MEMBERS} />
      </section>

      {/* ===== Videos ===== */}
      <section className="section">
        <div className="section-header-row">
          <h2 className="section-title">Videos</h2>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
          >
            Watch on YouTube
          </a>
        </div>
        <VideoLightbox videos={VIDEOS} />
      </section>

      {/* ===== Music ===== */}
      <section className="section">
        <div className="section-header-row">
          <h2 className="section-title">Music</h2>
          <Link href="/music" className="pill-btn">
            All music
          </Link>
        </div>
        <div className="list-rows">
          <Link href="/music" className="list-row">
            <Image
              src={FOCUS_SINGLE.cover}
              alt={FOCUS_SINGLE.title}
              width={56}
              height={56}
              className="list-thumb"
            />
            <div>
              <p className="list-title">{FOCUS_SINGLE.title}</p>
              <p className="list-subtitle">GrassTunes</p>
            </div>
          </Link>
          <Link href="/music" className="list-row">
            <Image
              src="/images/cover.jpg"
              alt={LIVE_TRACK.title}
              width={56}
              height={56}
              className="list-thumb"
            />
            <div>
              <p className="list-title">{LIVE_TRACK.title}</p>
              <p className="list-subtitle">{LIVE_TRACK.artist}</p>
            </div>
          </Link>
        </div>

        <div className="section-header-row split-subsection">
          <h2 className="section-title">Live History</h2>
        </div>
        <ul className="performance-list">
          {PERFORMANCES.map((show) => (
            <li key={show.venue} className="performance-item">
              <span className="performance-venue">{show.venue}</span>
              <span className="performance-year">{show.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
