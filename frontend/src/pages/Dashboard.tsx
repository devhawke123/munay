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
      <WelcomeBanner />
      <StatsCards />

      {/* Row 2: SalesOverview + RecentOrders side by side */}
      <div className="grid grid-cols-[1fr_1fr] gap-5 mt-3.5">
        <SalesOverview />
        <RecentOrders />
      </div>

      {/* Row 3: Activity | Inventory+Channel | QuickActions+BestSellers */}
      <div className="grid grid-cols-[350px_388px_1fr] gap-3 mt-4">
        <Activity />
        <div className="flex flex-col gap-4">
          <InventoryAlert />
          <SalesByChannel />
        </div>
        <div className="flex flex-col gap-2.5">
          <QuickActions />
          <BestSellers />
        </div>
      </div>
    </AdminLayout>
  );
}
