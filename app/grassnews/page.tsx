import type { Metadata } from "next";
import { ANNOUNCEMENTS } from "../data/content";
import ProfileHero from "../components/ProfileHero";

export const metadata: Metadata = {
  title: "GrassNews — GrassTunes",
  description: "Announcements from GrassTunes.",
};

export default function GrassNewsPage() {
  return (
    <>
      <ProfileHero />
      <div className="page">
        <section className="section">
          <h2 className="section-title">Announcements</h2>
          {ANNOUNCEMENTS.map((item) => (
            <article key={item.title} className="announcement-card">
              <h3 className="announcement-title">{item.title}</h3>
              <p className="announcement-timestamp">{item.timestamp}</p>
              {item.body.map((paragraph, i) => (
                <p key={i} className="announcement-paragraph">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
