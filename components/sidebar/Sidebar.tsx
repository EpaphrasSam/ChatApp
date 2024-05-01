import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/utils/actions/getCurrentUser";
import ErrorToast from "../global/ErrorToast";
import { User } from "@prisma/client";

async function Sidebar({ children }: { children: React.ReactNode }) {
  let currentUser = (await getCurrentUser()) as User | null | Error;
  let error = null;

  if (currentUser instanceof Error) {
    error = currentUser.message;
    currentUser = null;
  }

  return (
    <div className="h-full">
      <ErrorToast error={error} />
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
