import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-[#F7F7F8] min-h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-3 flex flex-col px-10">{children}</div>
      </div>
    </div>
  );
}
