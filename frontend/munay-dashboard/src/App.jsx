import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WelcomeBanner from "./components/WelcomeBanner";
import StatsCards from "./components/StatsCards";
import SalesOverview from "./components/SalesOverview";
import RecentOrders from "./components/RecentOrders";
import Activity from "./components/Activity";
import InventoryAlert from "./components/InventoryAlert";
import SalesByChannel from "./components/SalesByChannel";
import QuickActions from "./components/QuickActions";
import BestSellers from "./components/BestSellers";

function App() {
  return (
    <div className="flex bg-[#F7F7F8] min-h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-3 flex flex-col px-10">
          <WelcomeBanner />
          <StatsCards />
          <div className="grid grid-cols-[1fr_1fr] gap-5 items-start">
            {/* Left column: Sales Overview + Activity row stacked */}
            <div className="flex flex-col gap-3">
              <SalesOverview />
              <div className="grid grid-cols-2 gap-3 items-start">
                <Activity />
                <div className="flex flex-col gap-3">
                  <InventoryAlert />
                  <SalesByChannel />
                </div>
              </div>
            </div>
            {/* Right column: Recent Orders + Quick Actions + Best Sellers stacked */}
            <div className="flex flex-col gap-3">
              <RecentOrders />
              <QuickActions />
              <BestSellers />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;