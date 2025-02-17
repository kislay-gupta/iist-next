export function Section({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}
