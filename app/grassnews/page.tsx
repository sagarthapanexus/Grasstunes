import type { Metadata } from "next";
import { ANNOUNCEMENTS, NEWS_ITEMS } from "../data/content";
import ProfileHero from "../components/ProfileHero";

export const metadata: Metadata = {
  title: "GrassNews — GrassTunes",
  description: "Announcements and news from GrassTunes.",
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

        <section className="section">
          <h2 className="section-title">News</h2>
          <ul className="performance-list">
            {NEWS_ITEMS.map((item) => (
              <li key={item} className="performance-item">
                <span className="performance-venue">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
