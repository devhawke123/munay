import { type ReactNode, useState } from "react";
import "../../theme.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex flex-1 flex-col overflow-x-auto p-3 px-4 sm:px-6 lg:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
