"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import CustomAvatar from "../global/CustomAvatar";
import ProfileDrawer from "./ProfileDrawer";

type HeaderProps = {
  conversation: Conversation & { users: User[] };
};

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <div className="bg-white flex w-full border-p-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          <CustomAvatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setIsMenuOpen(true)}
          className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
        />
      </div>
    </>
  );
};

export default Header;
