import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getSession from "@/lib/getSession";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const { user } = await getSession();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={user} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
