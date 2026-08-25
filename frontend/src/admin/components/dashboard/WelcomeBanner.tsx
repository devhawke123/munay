import { currentUser } from "../../data/currentUser";
import waveIcon from "../../assets/Group.png";

export function WelcomeBanner() {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Left: Welcome text */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-text-primary">
            Welcome back, {currentUser.firstName}!
          </h2>
          <img src={waveIcon} alt="" className="h-6 w-6" />
        </div>
        <p className="text-xs font-bold text-text-muted mt-0.5">
          Here's what's happening with your store today.
        </p>
      </div>
    </div>
  );
}
