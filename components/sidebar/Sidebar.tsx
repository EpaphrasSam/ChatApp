import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/utils/actions/getCurrentUser";
import ErrorToast from "../global/ErrorToast";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const { currentUser, error } = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      {error && <ErrorToast errors={[error]} />}
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
