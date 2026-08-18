export function WelcomeBanner() {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Left: Welcome text */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-text-primary">
            Welcome back, Stella!
          </h2>
          <span className="text-xl">👋</span>
        </div>
        <p className="text-xs text-text-muted mt-0.5">
          Here's what's happening with your store today.
        </p>
      </div>
    </div>
  );
}
