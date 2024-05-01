import Sidebar from "@/components/sidebar/Sidebar";
import UsersList from "@/components/users/UsersList";
import getUsers from "@/utils/actions/getUsers";
import { User } from "@prisma/client";

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let users: User[] = [];
  let error: string | undefined = undefined;
  try {
    users = await getUsers();
    console.log(users);
  } catch (err: any) {
    // console.log(err);
    error = err.message;
  }

  return (
    <div className="h-full">
      <UsersList users={users} error={error} />
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
