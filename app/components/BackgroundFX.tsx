const PARTICLES = [
  { left: "8%", size: "8px", color: "#a8e63d", glow: "16px", speed: "9s", delay: "0s", drift: "30px" },
  { left: "18%", size: "6px", color: "#6b5ce7", glow: "12px", speed: "12s", delay: "2s", drift: "-20px" },
  { left: "28%", size: "10px", color: "#b8ff3e", glow: "20px", speed: "8s", delay: "4s", drift: "15px" },
  { left: "38%", size: "6px", color: "#a8e63d", glow: "12px", speed: "14s", delay: "1s", drift: "-35px" },
  { left: "48%", size: "12px", color: "#6b5ce7", glow: "24px", speed: "10s", delay: "3s", drift: "25px" },
  { left: "58%", size: "6px", color: "#b8ff3e", glow: "12px", speed: "11s", delay: "5s", drift: "-15px" },
  { left: "68%", size: "8px", color: "#a8e63d", glow: "16px", speed: "9s", delay: "0.5s", drift: "40px" },
  { left: "78%", size: "10px", color: "#6b5ce7", glow: "20px", speed: "13s", delay: "2.5s", drift: "-25px" },
  { left: "88%", size: "6px", color: "#b8ff3e", glow: "12px", speed: "7s", delay: "4.5s", drift: "20px" },
  { left: "93%", size: "8px", color: "#a8e63d", glow: "16px", speed: "11s", delay: "1.5s", drift: "-30px" },
];

export default function BackgroundFX() {
  return (
    <div className="background-fx" aria-hidden="true">
      <div className="bg-glow-green" />
      <div className="bg-glow-purple" />
      <div className="scanline" />
      <div className="particles-container">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              "--left": p.left,
              "--size": p.size,
              "--color": p.color,
              "--glow": p.glow,
              "--speed": p.speed,
              "--delay": p.delay,
              "--drift": p.drift,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
