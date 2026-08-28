import type { ApiChannelBreakdownRow } from "../../hooks/useSalesApi";
import { formatCurrency } from "../../lib/money";

const CHANNEL_LABEL: Record<string, string> = { ONLINE: "Website Sales", IN_STORE: "In-Store Sales" };
const CHANNEL_BAR_CLASS: Record<string, string> = { ONLINE: "bg-brand-dark", IN_STORE: "bg-brand-accent" };

export function ChannelBreakdown({ channels }: { channels: ApiChannelBreakdownRow[] }) {
  return (
    <div className="rounded-[7px] bg-white p-5">
      <h2 className="mb-4 text-sm font-display font-bold text-text-primary">Sales by Channel</h2>

      <div className="flex flex-col gap-4">
        {channels.map((channel) => (
          <div key={channel.channel}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-text-muted">{CHANNEL_LABEL[channel.channel] ?? channel.channel}</span>
              <span className="font-display font-bold text-text-primary">
                {formatCurrency(channel.revenue)} ({Math.round(channel.percent)}%)
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className={`h-full rounded-full ${CHANNEL_BAR_CLASS[channel.channel] ?? "bg-brand-dark"}`}
                style={{ width: `${channel.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
