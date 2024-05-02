"use client";

import { User } from "@prisma/client";
import React, { useEffect } from "react";
import UsersBox from "./UsersBox";
import toast from "react-hot-toast";

type UsersListProps = {
  users: User[];
  error?: string;
};

const UsersList = ({ users }: UsersListProps) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            <div className="text-2xl font-bold text-neutral-800">People</div>
            {users.map((user) => (
              <UsersBox key={user.id} data={user} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UsersList;
