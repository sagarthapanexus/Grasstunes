import type { Metadata } from "next";
import { MEMBERS } from "../data/content";
import ProfileHero from "../components/ProfileHero";
import GalleryLightbox from "../components/GalleryLightbox";

export const metadata: Metadata = {
  title: "Gallery — GrassTunes",
  description: "Photos of GrassTunes, the alternative and funk-rock band from Kathmandu, Nepal.",
};

const GALLERY_IMAGES = [
  { src: "/images/cover.jpg", alt: "GrassTunes cover photo" },
  { src: "/images/profile.jpg", alt: "GrassTunes band photo" },
  ...MEMBERS.map((member) => ({ src: member.photo, alt: `${member.name} — GrassTunes` })),
];

export default function GalleryPage() {
  return (
    <>
      <ProfileHero />
      <div className="page">
        <section className="section">
          <GalleryLightbox images={GALLERY_IMAGES} />
          <p className="gallery-note">
            Technical rider, stage plot, and high-res promotional photos available upon request.
          </p>
        </section>
      </div>
    </>
  );
}
