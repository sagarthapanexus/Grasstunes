export default function ComingSoonLink({
  children,
  className = "",
  title = "Coming soon",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`coming-soon ${className}`}
      role="note"
      aria-label={title}
      title={title}
    >
      {children}
      <span className="coming-soon-badge">Soon</span>
    </span>
  );
}
