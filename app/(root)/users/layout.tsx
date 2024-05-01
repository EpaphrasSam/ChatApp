import ErrorToast from "@/components/global/ErrorToast";
import Sidebar from "@/components/sidebar/Sidebar";
import UsersList from "@/components/users/UsersList";
import getUsers from "@/utils/actions/getUsers";
import { User } from "@prisma/client";

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let users: User[] = await getUsers();
  let error = null;

  if (users instanceof Error) {
    error = users.message;
    users = [];
  }

  return (
    <div className="h-full">
      <ErrorToast error={error} />
      <UsersList users={users} />
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
