import type { Metadata } from "next";
import "./globals.css";
import BackgroundFX from "./components/BackgroundFX";
import Footer from "./components/Footer";
import DisableRightClick from "./components/DisableRightClick";
import WaffleMenu from "./components/WaffleMenu";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grasstunes.music"),
  title: "GrassTunes — Alternative & Funk Rock from Kathmandu",
  description:
    "GrassTunes is an independent four-piece alternative and funk-rock band from Kathmandu, Nepal, formed in 2016. Listen to music, watch videos, and follow the band.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "GrassTunes",
    description:
      "Alternative and funk-rock outfit from Kathmandu, Nepal. Formed 2016.",
    type: "website",
    images: [{ url: "/images/logo.png", width: 5062, height: 1913, alt: "GrassTunes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrassTunes",
    description:
      "Alternative and funk-rock outfit from Kathmandu, Nepal. Formed 2016.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <DisableRightClick />
        <BackgroundFX />
        <main className="site-main">{children}</main>
        <Footer />
        <WaffleMenu />
      </body>
    </html>
  );
}
