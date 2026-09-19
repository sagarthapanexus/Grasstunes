import type { Metadata } from "next";
import ProfileHero from "../components/ProfileHero";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — GrassTunes",
  description: "Booking and press contact for GrassTunes.",
};

export default function ContactPage() {
  return (
    <>
      <ProfileHero />
      <div className="page">
        <section className="section contact-section">
          <h2 className="section-title">Booking &amp; Press</h2>
          <p className="contact-copy">
            For bookings, press inquiries, or collaboration requests, reach out to GrassTunes directly using the form below:
          </p>
          <p className="contact-note">
            Electronic Press Kit (EPK) available upon request.
          </p>

          <h2 className="section-title">Send a Message</h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
