import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full overflow-hidden bg-[#F7F7F8]">
      <Sidebar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Header />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-8 py-3">
          {children}
        </div>
      </div>
    </div>
  );
}
