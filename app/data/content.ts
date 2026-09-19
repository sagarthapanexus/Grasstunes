// Content transcribed from "GrassTunes Information.docx" (band EPK).
// Single source of truth — pages should import from here rather than hardcoding copy.

export type SocialKey = "facebook" | "tiktok" | "youtube" | "instagram";

export interface SocialLink {
  key: SocialKey;
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { key: "facebook", href: "https://www.facebook.com/Grasstunes", label: "Facebook" },
  { key: "tiktok", href: "https://www.tiktok.com/@grasstunes_", label: "TikTok" },
  { key: "youtube", href: "https://www.youtube.com/Grasstunes", label: "YouTube" },
  { key: "instagram", href: "https://www.instagram.com/grasstunes_/", label: "Instagram" },
];

export const BAND = {
  name: "GrassTunes",
  tagline: "Alternative & funk rock, straight from Kathmandu",
  location: "Kathmandu, Nepal",
  formedYear: 2016,
  genres: ["Alternative Rock", "Funk Rock", "Rock & Roll"],
  subGenres: ["Blues", "Synth", "Punk", "Pop", "Rock"],
  influences: ["'60s–'70s Rock & Roll", "'80s Synth-Pop"],
  bio: `GrassTunes is a four-piece alternative and funk-rock outfit based in Kathmandu, Nepal. Formed in 2016, the band brings together four close friends whose shared love for music is deeply rooted in nature and human experience. Drawing inspiration from a wide spectrum of musical eras—including '60s and '70s rock and roll, funk rock, blues, punk, and '80s synth-pop—GrassTunes crafts a dynamic sound characterized by expressive grooves and melody-driven arrangements.`,
  bioExtended: `What began as casual jam sessions, tea breaks, and shared discovery evolved over time into a focused creative collective. Driven by a desire to share their rhythm and storytelling with broader audiences, GrassTunes has performed across notable local venues and events, including the Kathmandu Blues and Roots Festival. Today, the band continues to expand its sonic horizon with new studio releases and live performances.`,
  shortBio: `GrassTunes is an independent four-piece band from Kathmandu, Nepal, blending funk rock, alternative rock, and blues-infused melodies into an authentic live sound.`,
};

export interface Member {
  slug: string;
  name: string;
  role: string;
  years: string;
  bio: string;
  photo: string;
}

export const MEMBERS: Member[] = [
  {
    slug: "simon-upreti",
    name: "Simon Upreti",
    role: "Vocals & Bass",
    years: "2016 – Present",
    bio: `Simon's musical journey began during his school years, evolving into a lifelong exploration of sound and meaning. As the lead vocalist and bassist for GrassTunes, he brings a grounded, reflective energy to the group, drawing key musical influences from funk rock, punk, and classic rock and roll. For Simon, music serves as a vehicle to explore life's broader narrative while remaining centered through personal mindfulness and a constant curiosity for instruments.`,
    photo: "/images/members/simon.jpg",
  },
  {
    slug: "sujan-shrestha",
    name: "Sujan Shrestha",
    role: "Guitar",
    years: "2016 – Present",
    bio: `Raised in a deeply musical household where he watched his father and brothers play, Sujan naturally gravitated toward the guitar. His playing style is rooted in funk and psychedelic rock, combining rhythmic drive with atmospheric textures. As one of the founding members of GrassTunes, Sujan balances his creative dedication to the band with his personal and professional commitments.`,
    photo: "/images/members/sujan.jpg",
  },
  {
    slug: "nishant-shakya",
    name: "Nishant Shakya",
    role: "Keyboards",
    years: "2016 – Present",
    bio: `Nishant brings formal music education and professional mastery to GrassTunes. Serving as the Director of Foundation in Music at the Kathmandu Jazz Conservatory, he is the sole band member who works full-time in music. Rooted in classic rock and roll, Nishant continuously expands his palette with synth-pop textures, enriching the band's sonic layer with textured keys and synthesizer arrangements.`,
    photo: "/images/members/nishant.jpg",
  },
  {
    slug: "anish-bhandari",
    name: "Anish Bhandari",
    role: "Drums",
    years: "2024 – Present",
    bio: `Anish's connection to music was sparked early on during school assemblies while watching his teachers perform on stage. Joining GrassTunes as its newest member in 2024, his rhythmic foundation drives the band's live dynamic. For Anish, playing the drums serves both as a creative expression and a restorative outlet, balancing the demands of adult life with present-moment rhythm.`,
    photo: "/images/members/anish.jpg",
  },
];

export interface Performance {
  venue: string;
  year: string;
}

export const PERFORMANCES: Performance[] = [
  { venue: "Hamro Utsav, Band Competition, King's College", year: "2017" },
  { venue: "Patan College for Professional Studies", year: "2017" },
  { venue: "Himalayan Java First Anniversary, Labim Mall", year: "2017" },
  { venue: "Sofar Sounds Kathmandu", year: "2017" },
  { venue: "Laya Chautari: An Evening of Spoken Art", year: "2018" },
  { venue: "Good Times Rolling", year: "2019" },
  { venue: "4th Kathmandu Blues and Roots Festival", year: "2019" },
  { venue: "Ramsterdam Cafe, Kathmandu", year: "2025" },
  { venue: "Tito's Pub, Thamel, Kathmandu", year: "2026" },
];

export const MEDIA_COVERAGE_VIDEO_ID = "UFMl8Ccw3pQ";

export const ANNOUNCEMENTS: string[] = ["EP – Coming soon!"];

export const NEWS_ITEMS: string[] = ["EP – Coming soon!"];

export const FOCUS_SINGLE = {
  title: "Sadhai Sari",
  label: "Focus Single",
  cover: "/images/cover.jpg",
};

export const LIVE_TRACK = {
  title: "Timi Jastai Ma",
  artist: "GrassTunes · Live in Ramsterdam",
  src: "/Timi Jastai Ma  Grasstunes  Live in Ramsterdam.mp3",
};

export const CONTACT_EMAIL = "GRASSTUNESOFFICIAL@GMAIL.COM";
// Public Web3Forms access key tied to CONTACT_EMAIL — safe to expose client-side,
// it only authorizes submissions to that inbox (not a secret credential).
export const WEB3FORMS_ACCESS_KEY = "c9bd2fc2-d479-4a84-a4b1-16cfcbfc0bae";

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Grasstunes/videos?view=0&sort=dd&shelf_id=1";

export interface Video {
  id: string;
  title: string;
}

export const VIDEOS: Video[] = [
  { id: "pX8LIVHSFjY", title: "Timi Jastai Ma | GrassTunes | Live in Ramsterdam" },
  { id: "OcRJsNWc4IA", title: "Sadhai Sari | GrassTunes | Live in Ramsterdam" },
  { id: "Eqj4aUwqIv4", title: "GrassTunes - Sawari [Official Video]" },
  { id: "9J78ChdK404", title: "GrassTunes - Go With The Flow [Official Video]" },
  { id: "9S3muaXN3To", title: "GrassTunes - Nature Calls [Audio]" },
  { id: "Mk9ElkqYB4s", title: "GrassTunes - Fly High [Audio]" },
  { id: "roDMDn33POI", title: "GrassTunes - Fall In Love Again [Official Video]" },
];

export const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/music", label: "Music" },
  { href: "/videos", label: "Videos" },
  { href: "/media-coverage", label: "Media Coverage" },
  { href: "/gallery", label: "Gallery" },
  { href: "/grassnews", label: "GrassNews" },
  { href: "/contact", label: "Contact" },
];
