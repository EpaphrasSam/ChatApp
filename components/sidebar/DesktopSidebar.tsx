"use client";

import useRoutes from "@/hooks/useRoutes";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import CustomAvatar from "../global/CustomAvatar";
import SettingsModal from "../modals/SettingsModal";
import { User } from "@prisma/client";

type DesktopSidebarProps = {
  currentUser: User;
};

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <SettingsModal
          currentUser={currentUser}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      )}

      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <CustomAvatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
