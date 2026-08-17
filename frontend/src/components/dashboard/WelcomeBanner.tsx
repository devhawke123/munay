export function WelcomeBanner() {
  return (
    <div className="shrink-0">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome back, Stella!
        </h2>
        <span className="text-lg">👋</span>
      </div>
      <p className="text-xs text-gray-500">
        Here's what's happening with your store today.
      </p>
    </div>
  );
}
