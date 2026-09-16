import Image from "next/image";

export default function GlowLogo({ size = "large" }: { size?: "large" | "small" }) {
  const width = size === "large" ? 300 : 120;
  const height = Math.round(width / 2.646);

  return (
    <div className={`glow-logo glow-logo-${size}`}>
      <div className="logo-ring" aria-hidden="true" />
      <div className="logo-ring" aria-hidden="true" />
      <div className="logo-ring" aria-hidden="true" />
      <Image
        src="/images/logo.png"
        alt="GrassTunes"
        width={width}
        height={height}
        className="glow-logo-img"
        priority
      />
    </div>
  );
}
