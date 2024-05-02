"use client";

import { FullMessageType } from "@/types/ConversationType";
import { UserType } from "@/types/UserType";
import clsx from "clsx";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import CustomAvatar from "../global/CustomAvatar";
import { format } from "date-fns";
import Image from "next/image";
import axios from "axios";

type MessageBoxProps = {
  data: FullMessageType;
  isLast?: Boolean;
};

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const { data: session } = useSession();
  const user = session?.user as UserType;

  const isOwn = user?.id === data.sender?.id;
  const seenList = (data.seen || [])
    .filter((user) => user.id !== data.sender?.id)
    .map((user) => user.name)
    .join(", ");

  const container = clsx(`flex gap-3 p-4`, isOwn && `justify-end`);
  const avatar = clsx(isOwn && "order-2");
  const body = clsx(`flex flex-col gap-2`, isOwn && "items-end");
  const message = clsx(
    `text-sm w-fit overflow-hidden`,
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <CustomAvatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt="Image"
              src={data.image}
              width="150"
              height="150"
              className="object-fit cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
