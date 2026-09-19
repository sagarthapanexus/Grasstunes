import type { MetadataRoute } from "next";
import { NAV_LINKS } from "./data/content";

const BASE_URL = "https://www.grasstunes.music";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map((link) => ({
    url: `${BASE_URL}${link.href}`,
    lastModified: new Date(),
  }));
}
