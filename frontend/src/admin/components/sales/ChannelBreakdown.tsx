import { salesByChannel } from "../../data/salesAnalytics";

export function ChannelBreakdown() {
  return (
    <div className="rounded-[7px] bg-white p-5">
      <h2 className="mb-4 text-sm font-display font-bold text-text-primary">Sales by Channel</h2>

      <div className="flex flex-col gap-4">
        {salesByChannel.map((channel) => (
          <div key={channel.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-text-muted">{channel.label}</span>
              <span className="font-display font-bold text-text-primary">{channel.amount}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className={`h-full rounded-full ${channel.barClassName}`}
                style={{ width: `${channel.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
