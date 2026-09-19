import type { Metadata } from "next";
import { MEDIA_COVERAGE_VIDEO_ID } from "../data/content";
import ProfileHero from "../components/ProfileHero";

export const metadata: Metadata = {
  title: "Media Coverage — GrassTunes",
  description: "Media coverage and press features for GrassTunes.",
};

export default function MediaCoveragePage() {
  return (
    <>
      <ProfileHero />
      <div className="page">
        <section className="section">
          <h2 className="section-title">Media Coverage</h2>
          <div className="media-embed-frame">
            <iframe
              src={`https://www.youtube.com/embed/${MEDIA_COVERAGE_VIDEO_ID}`}
              title="GrassTunes media coverage"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </>
  );
}
