import Image from "next/image";
import { BAND } from "../data/content";
import GlowLogo from "./GlowLogo";
import ProfileTabs from "./ProfileTabs";

export default function ProfileHero() {
  return (
    <section className="profile-hero">
      <div className="hero-banner">
        <Image
          src="/images/cover.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hero-banner-img"
          priority
        />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-logo">
          <GlowLogo size="large" />
        </div>
      </div>

      <div className="hero-identity">
        <div className="hero-avatar-wrap">
          <Image
            src="/images/profile.jpg"
            alt="GrassTunes"
            width={112}
            height={112}
            className="hero-avatar"
            priority
          />
        </div>
        <div className="hero-identity-text">
          <h1 className="hero-name">GrassTunes</h1>
          <p className="hero-genres">{BAND.genres.join(", ")}</p>
        </div>
      </div>

      <ProfileTabs />
    </section>
  );
}
