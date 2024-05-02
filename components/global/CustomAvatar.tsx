"use client";

import { UserType } from "@/types/UserType";
import { Avatar, Badge } from "@nextui-org/react";
import { User } from "@prisma/client";
import React from "react";

type AvatarProps = {
  user: User | UserType;
};

const CustomAvatar = ({ user }: AvatarProps) => {
  return (
    <Badge
      isOneChar
      shape="circle"
      placement="top-right"
      color="success"
      size="sm"
    >
      <Avatar src={user.image || "/placeholder.jpg"} />
    </Badge>
  );
};

export default CustomAvatar;
