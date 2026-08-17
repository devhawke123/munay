import { AdminLayout } from "../components/layout/AdminLayout";
import { WelcomeBanner } from "../components/dashboard/WelcomeBanner";
import { StatsCards } from "../components/dashboard/StatsCards";
import { SalesOverview } from "../components/dashboard/SalesOverview";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { Activity } from "../components/dashboard/Activity";
import { InventoryAlert } from "../components/dashboard/InventoryAlert";
import { SalesByChannel } from "../components/dashboard/SalesByChannel";
import { QuickActions } from "../components/dashboard/QuickActions";
import { BestSellers } from "../components/dashboard/BestSellers";

export function Dashboard() {
  return (
    <AdminLayout>
      <div className="flex h-full min-h-0 flex-col gap-3">
        <WelcomeBanner />
        <StatsCards />
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
          <div className="flex min-h-0 flex-col gap-3">
            <SalesOverview />
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
              <Activity />
              <div className="flex min-h-0 flex-col gap-3">
                <InventoryAlert />
                <SalesByChannel />
              </div>
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-3">
            <RecentOrders />
            <QuickActions />
            <BestSellers />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
