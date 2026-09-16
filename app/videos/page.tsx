import type { Metadata } from "next";
import { VIDEOS, YOUTUBE_CHANNEL_URL } from "../data/content";
import ProfileHero from "../components/ProfileHero";
import VideoLightbox from "../components/VideoLightbox";

export const metadata: Metadata = {
  title: "Videos — GrassTunes",
  description: "Watch all GrassTunes videos, live performances, and official uploads.",
};

export default function VideosPage() {
  return (
    <>
      <ProfileHero />
      <div className="page">
        <section className="section">
          <div className="section-header-row">
            <h2 className="section-title">Videos</h2>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary youtube-cta"
            >
              Watch on YouTube
            </a>
          </div>
          <VideoLightbox videos={VIDEOS} />
        </section>
      </div>
    </>
  );
}
