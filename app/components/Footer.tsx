import Link from "next/link";
import { NAV_LINKS } from "../data/content";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="footer-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <SocialLinks />

        <p className="footer-copyright">© {year} GrassTunes. All rights reserved.</p>
      </div>
    </footer>
  );
}
